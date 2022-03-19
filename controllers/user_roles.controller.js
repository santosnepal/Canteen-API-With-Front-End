const UserRolesService = require("../services/user_roles.service");
const GlobalResponse = require("../utils/globalResponse.utils");
class UserRolesController {
  async create(req, res, next) {
    try {
      const body = req.body;
      const savedData = await UserRolesService.create(body);
      return GlobalResponse(res, 200, "Role Assigned Success", savedData);
    } catch (error) {
      next(error);
    }
  }
  async delete_role(req, res, next) {
    try {
      const { user_id, role_id } = req.body;
      const result = await UserRolesService.delete_role(user_id, role_id);
      return GlobalResponse(res, 200, "Role Deletion Success", result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserRolesController();
