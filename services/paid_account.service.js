const { paid_account, user } = require("../DB/index");
class PaidAccountService {
  //store amount paid by a user
  async create(paidData) {
    try {
      const savedData = await paid_account.create(paidData);
      return savedData;
    } catch (error) {
      return error;
    }
  }
  //show all detail of amount paid by a user
  async findByUserId(userId) {
    try {
      const hisData = await paid_account.findAll({
        where: {
          user_id: userId,
        },
        include: {
          model: user,
          attributes: ["id", "name"],
        },
        attributes: ["id", "amount", "created_at"],
      });
      return hisData;
    } catch (error) {
      return error;
    }
  }
  //delete a paid detail
  async deleteById(which) {
    try {
      await paid_account.destroy({
        where: {
          id: which,
        },
      });
      return {
        status: true,
        message: "The paid amount detail has been deleted successfully",
      };
    } catch (error) {
      return error;
    }
  }
}
module.exports = new PaidAccountService();
