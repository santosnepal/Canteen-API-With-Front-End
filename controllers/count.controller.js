const CountService = require("../services/count.service");
const GlobalResponse = require("../utils/globalResponse.utils");
class CountController {
  async staffcount(req, res, next) {
    try {
      const result = await CountService.staffCount();
      return GlobalResponse(res, 200, "Staff Count In System", result);
    } catch (error) {
      next(error);
    }
  }
  async customercount(req, res, next) {
    try {
      const result = await CountService.customerCount();
      return GlobalResponse(res, 200, "customer Count In System", result);
    } catch (error) {
      next(error);
    }
  }
  async itemscount(req, res, next) {
    try {
      const result = await CountService.itemCount();
      return GlobalResponse(res, 200, "Items In system", result);
    } catch (error) {
      next(error);
    }
  }
  async pendingordercount(req, res, next) {
    try {
      const result = await CountService.pendingordercount(req.body);
      return GlobalResponse(res, 200, "Pending Order of given date", result);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CountController();
