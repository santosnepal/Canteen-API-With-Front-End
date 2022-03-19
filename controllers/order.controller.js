const OrderService = require("../services/order.service");
const ItemService = require("../services/item.service");
const GlobalResponse = require("../utils/globalResponse.utils");
const { send } = require("../utils/notification.utils");
const isAdmin = require("../utils/isAdmin.utils");
const ValidationException = require("../exceptions/validationException");
class OrderController {
  async create(req, res, next) {
    try {
      const orderData = req.body;
      orderData.user_id = req.user.id;
      orderData.status = false;
      const avilable = await ItemService.findById(req.body.item_id);
      // console.log(avilable);
      if (avilable === null) {
        return res.status(404).json({
          status: false,
          message: "The item is  not avilable to order2",
        });
      }
      if (!avilable.dataValues.avilability) {
        return res.status(404).json({
          status: false,
          message: "The item is  not avilable to order1",
        });
      }
      const savedOrder = await OrderService.create(orderData);
      const newOrder = await OrderService.findById(savedOrder.id);
      send(newOrder);
      return GlobalResponse(res, 200, "Item Orderd success", newOrder);
    } catch (error) {
      next(error);
    }
  }
  async changeStatus(req, res, next) {
    try {
      const whichOrder = req.params.orderId;
      const found = await OrderService.findById(whichOrder);
      if (found === null) {
        return res
          .status(404)
          .json({ status: false, message: "The order is not avilable" });
      }
      const changed = await OrderService.changeStatus(whichOrder);
      return GlobalResponse(res, 200, "Order Modification success", changed);
    } catch (error) {
      next(error);
    }
  }
  async getAllRemainingOrder(req, res, next) {
    try {
      const orders = await OrderService.getAllRemainingOrder();
      return GlobalResponse(res, 200, "All Remaining Order In system", orders);
    } catch (error) {
      next(error);
    }
  }
  async getMyTodaysOrder(req, res, next) {
    try {
      const who = req.user.id;
      const orders = await OrderService.getMyTodaysOrder(who);
      return GlobalResponse(res, 200, "My Todays Pending Order", orders);
    } catch (error) {
      next(error);
    }
  }
  async getTodaysRemainingOrder(req, res, next) {
    try {
      const orders = await OrderService.getTodaysRemainingOrder();
      return GlobalResponse(res, 200, "todays Remaining Order", orders);
    } catch (error) {
      next(error);
    }
  }
  async getTodaysAllOrder(req, res, next) {
    try {
      const orders = await OrderService.getTodaysAllOrder();
      return GlobalResponse(res, 200, "todays All Order", orders);
    } catch (error) {
      next(error);
    }
  }
  async deleteAOrder(req, res, next) {
    try {
      if (!req.body.orderId) {
        return res.status(404).json({
          status: "false",
          message: "Please specify The order Id to delete",
        });
      }
      const which = await OrderService.findById(req.body.orderId);
      if (which === null) {
        return res.status(404).json({
          status: false,
          message: "The order is not avilable to delete",
        });
      }
      if (which.status === true) {
        return res.status(404).json({
          status: false,
          message: "The order is not avilable to delete",
        });
      }
      const is_admin = await isAdmin(req.user.id);
      if (is_admin || which.user.id === req.user.id) {
        console.log("is admin", isAdmin);
        console.log(which.user.id, req.user.id);
        const status = await OrderService.deletedAOreder(req.body.orderId);
        return GlobalResponse(res, 200, "Order Deleted success", status);
      }
      throw new ValidationException(422, "Not Authorized", null);
    } catch (error) {
      next(error);
    }
  }
  async modifyOrder(req, res, next) {
    try {
      const which = await OrderService.findById(req.params.orderId);
      if (which === null) {
        return res.status(404).json({
          status: false,
          message: "The order is not avilable to modify",
        });
      }
      if (which.status === true) {
        return res.status(404).json({
          status: false,
          message: "The order is not avilable to modfy",
        });
      }
      if (req.user.id !== which.user.id) {
        throw new ValidationException(422, "Not Authorized", null);
      }
      const modifiedOrder = await OrderService.modifyOrder(
        req.params.orderId,
        req.body
      );
      const newOrder = await OrderService.findById(modifiedOrder.id);
      send(newOrder);
      return GlobalResponse(res, 200, "Order Modfication success", newOrder);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = new OrderController();
