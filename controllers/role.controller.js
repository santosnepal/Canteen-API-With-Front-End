const RoleService = require("../services/role.service");
const GloblResponse = require("../utils/globalResponse.utils");
class RoleController {
  async create(req, res, next) {
    try {
      const savedRole = await RoleService.create(req.body);
      return GloblResponse(res, 200, "Role Added In system", savedRole);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req, res, next) {
    try {
      const roles = await RoleService.findAll();
      return GloblResponse(res, 200, "All Roles In System", roles);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoleController();
