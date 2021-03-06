const amountService = require("../services/amount.service");
const GlobalResponse = require("../utils/globalResponse.utils");
class AmountController {
  async findHisTotalCreditAmount(req, res, next) {
    try {
      if (!req.body.userId) {
        res
          .status(404)
          .json({ success: false, message: "please specify whose amount " });
      }
      const amount = await amountService.findTotalCreditAmount(req.body.userId);
      res.status(200).json(amount);
    } catch (error) {
      next(error);
    }
  }
  async TotalExpanses(req, res, next) {
    try {
      const results = await amountService.TotalMyExpenses(req.user.id);
      return GlobalResponse(res, 200, "Total Expenses till now", results);
    } catch (error) {
      next(error);
    }
  }
  async FindMyTotalCreditAmount(req, res, next) {
    try {
      const whose = req.user.id;
      const amount = await amountService.findTotalCreditAmount(whose);
      res.status(200).json(amount);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AmountController();
