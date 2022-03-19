const PaidAccountService = require("../services/paid_account.service");
const GlobalResponse = require("../utils/globalResponse.utils");
class PaidAccountController {
  //saved amount paid by a user only for staff and admin
  async create(req, res, next) {
    try {
      const paidData = req.body;
      const savedData = await PaidAccountService.create(paidData);
      return GlobalResponse(
        res,
        200,
        "Payment Of user Recorded Successsfully",
        savedData
      );
    } catch (error) {
      next(error);
    }
  }
  //get all paid amount detail of loginned user
  async findMyPaidHistory(req, res, next) {
    try {
      const whose = req.user.id;
      const details = await PaidAccountService.findByUserId(whose);
      return GlobalResponse(res, 200, "My Payment History", details);
    } catch (error) {
      next(error);
    }
  }
  //get all paid amount detail of a user by admin or staff
  async findHisPaidHistory(req, res, next) {
    try {
      const whose = req.params.userId;
      const details = await PaidAccountService.findByUserId(whose);
      return GlobalResponse(res, 200, "His Payment History", details);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new PaidAccountController();
