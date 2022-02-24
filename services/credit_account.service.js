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
                attributes: [
                  "id",
                  "name",
                  "price",
                  //   [sequelize.literal(`(quantity*price)`), "total"],
                ],
              },
            ],
          },
          //   [sequelize.literal(`(quantity*price)`), "total"],
        ],
        attributes: [
          "id",
          "user_id",
          [sequelize.literal(`(quantity*price)`), "total"],
        ],
      });
      console.log("hello", creditAmt);
      return creditAmt;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
module.exports = new CreditAccountService();
