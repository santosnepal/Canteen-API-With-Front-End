const { users_role, sequelize } = require("../DB/index");
class UsersRolesService {
  async create(data) {
    try {
      const savedData = await users_role.create(data);
      return savedData;
    } catch (error) {
      return error;
    }
  }
  async delete_role(user_id, role_id) {
    try {
      const [results, metadata] = await sequelize.query(
        `DELETE  FROM users_roles WHERE user_id=${user_id} AND role_id=${role_id}`
      );
      return results;
    } catch (error) {
      return error;
    }
  }
}
module.exports = new UsersRolesService();
