const PaidAccountService = require("../services/paid_account.service");
class PaidAccountController {
  //saved amount paid by a user only for staff and admin
  async create(req, res, next) {
    try {
      const paidData = req.body;
      const savedData = await PaidAccountService.create(paidData);
      res.status(200).json(savedData);
    } catch (error) {
      next(error);
    }
  }
  //get all paid amount detail of loginned user
  async findMyPaidHistory(req, res, next) {
    try {
      const whose = req.user.id;
      const details = await PaidAccountService.findByUserId(whose);
      res.status(200).json(details);
    } catch (error) {
      next(error);
    }
  }
  //get all paid amount detail of a user by admin or staff
  async findHisPaidHistory(req, res, next) {
    try {
      const whose = req.params.userId;
      const details = await PaidAccountService.findByUserId(whose);
      res.status(200).json(details);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new PaidAccountController();
