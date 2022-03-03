const { role } = require("../DB/index");
class RoleService {
  async create(roleData) {
    try {
      const savedRole = await role.create(roleData);
      return savedRole;
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    try {
      const roles = await role.findAll();
      return roles;
    } catch (error) {
      return error;
    }
  }
  async findByRoleName(rolename) {
    try {
      const roles = await role.findOne({
        where: {
          name: rolename,
        },
        attributes: ["id"],
      });
      return roles;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new RoleService();
