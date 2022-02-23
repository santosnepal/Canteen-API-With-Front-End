const OrderService = require("../services/order.service");
class OrderController {
  async create(req, res, next) {
    try {
      const orderData = req.body;
      orderData.user_id = req.user.id;
      orderData.status = false;
      const savedOrder = await OrderService.create(orderData);
      res.status(200).json(savedOrder);
    } catch (error) {
      next(error);
    }
  }
  async changeStatus(req, res, next) {
    try {
      const whichOrder = req.params.orderId;
      const found = await OrderService.findById(whichOrder);
      if (!found.length) {
        res
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
