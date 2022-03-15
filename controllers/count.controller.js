const CountService = require("../services/count.service");
const GlobalResponse = require("../utils/globalResponse.utils");
class CountController {
  async staffcount(req, res, next) {
    try {
      const result = await CountService.staffCount();
      return GlobalResponse(res, 200, "StaffCount In Syatem", result);
    } catch (error) {
      GlobalResponse(res, 500, "Error Occured in Server", error, false);
    }
  }
}
module.exports = new CountController();
