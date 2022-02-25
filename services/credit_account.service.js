const { credit_account, order, item, sequelize } = require("../DB/index");
const Sequelize = require("sequelize");
class CreditAccountService {
  async create(creditData) {
    try {
      const savedData = await credit_account.create(creditData);
      return savedData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async findByUserId(userId) {
    try {
      const creditAmt = await credit_account.findAll({
        where: { user_id: userId },
        include: [
          {
            model: order,
            attributes: ["id", "quantity"],
            include: [
              {
                model: item,
                attributes: ["id", "name", "price"],
              },
            ],
          },
        ],
        attributes: [
          "id",
          "user_id",
          [sequelize.literal(`(quantity*price)`), "total"],
        ],
      });
      return creditAmt;
    } catch (error) {
      return error;
    }
  }
  async deleteByOrderId(orderId) {
    try {
      await credit_account.destroy({
        where: {
          order_id: orderId,
        },
      });
      return { message: "removed" };
    } catch (error) {
      return error;
    }
  }
}
module.exports = new CreditAccountService();
