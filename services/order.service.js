const { order, user, item } = require("../DB/index");
const credit_accountService = require("./credit_account.service");
class UserService {
  async create(orderData) {
    try {
      const savedOrder = await order.create(orderData);
      return savedOrder;
    } catch (error) {
      return error;
    }
  }
  async findById(oid) {
    try {
      const found = await order.findOne({
        where: {
          id: oid,
        },
        include: [
          {
            model: user,
            attributes: ["id", "name"],
          },
          {
            model: item,
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id", "quantity"],
      });
      return found;
    } catch (error) {
      return error;
    }
  }
  async changeStatus(which) {
    try {
      const found = await order.findOne({
        where: {
          id: which,
        },
      });
      found.status = !found.status;
      await found.save();
      if (found.status) {
        await credit_accountService.create({
          user_id: found.user_id,
          order_id: found.id,
        });
        return {
          status: "completed",
          message:
            "The order has been completed and deliverd to customer and amount recorded in credit",
        };
      }
      await credit_accountService.deleteByOrderId(found.id);
      return {
        status: "not completed",
        message:
          "The order has been marked as not completed and amount removed from credit",
      };
    } catch (error) {
      return error;
    }
  }
  async getAllRemainingOrder() {
    try {
      const orders = await order.findAll({
        where: { status: false },
        include: [
          {
            model: user,
            attributes: ["id", "name"],
          },
          {
            model: item,
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id", "quantity"],
      });
      return orders;
    } catch (error) {
      //   console.log(error);
      return error;
    }
  }
}
module.exports = new UserService();
