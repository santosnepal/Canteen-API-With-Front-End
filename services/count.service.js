const { sequelize } = require("../DB/index");
class CountService {
  //returns no of user having staff role  in system
  async staffCount() {
    try {
      const [results, metadata] = await sequelize.query(
        ` SELECT COUNT ( user_id) from users_roles WHERE role_id =(SELECT id from roles WHERE name='staff' ) `
      );
      return results;
    } catch (error) {
      return error;
    }
  }
}
module.exports = new CountService();
