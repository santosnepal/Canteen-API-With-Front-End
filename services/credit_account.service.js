const { credit_account, order, item, sequelize } = require("../DB/index");
class CreditAccountService {
  async create(creditData) {
    try {
      const savedData = await credit_account.create(creditData);
      return savedData;
    } catch (error) {
      return error;
    }
  }
  async findByUserId(userId) {
    try {
      const creditAmt = credit_account.findAll({
        where: { user_id: userId },
        include: [
          {
            model: order,
            include: [
              {
                model: item,
                attributes: ["name,price", "id"],
              },
            ],
            attributes: [
              "id",
              [
                sequelize.literal(`(
                            SELECT item.price*order.quantity as amount 
                        )`),
              ],
            ],
          },
        ],
      });
      return creditAmt;
    } catch (error) {
      return error;
    }
  }
}
module.exports = new CreditAccountService();
