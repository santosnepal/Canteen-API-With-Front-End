const OrderService = require("../services/order.service");
const ItemService = require("../services/item.service");
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
      // console.log(savedOrder);
      res.status(200).json(savedOrder);
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
      res.status(200).json(changed);
    } catch (error) {
      next(error);
    }
  }
  async getAllRemainingOrder(req, res, next) {
    try {
      const orders = await OrderService.getAllRemainingOrder();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new OrderController();
