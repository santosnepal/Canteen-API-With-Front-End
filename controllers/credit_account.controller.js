const CreditAccountService = require("../services/credit_account.service");
class CreditAccountController {
  //create is only for testing purpose will be directly created via servie later
  async create(req, res, next) {
    try {
      const body = req.body;
      const savedData = await CreditAccountService.create(body);
      res.status(200).json(savedData);
    } catch (error) {
      next(error);
    }
  }
  //get credit detail of loginned user
  async findMyCredit(req, res, next) {
    try {
      const userId = req.user.id;
      const creditData = await CreditAccountService.findByUserId(userId);
      res.status(200).json(creditData);
    } catch (error) {
      next(error);
    }
  }
  //get credit detail of any user by admin or staff
  async findHisCredit(req, res, next) {
    try {
      const whose = req.body.userId;
      const creditObject = await CreditAccountService.findByUserId(whose);
      res.status(200).json(creditObject);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CreditAccountController();
