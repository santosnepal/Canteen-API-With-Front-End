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
  //returns no of user having only user role in system
  async customerCount() {
    try {
      const [results, metadata] = await sequelize.query(
        ` SELECT COUNT ( user_id) from users_roles WHERE role_id =(SELECT id from roles WHERE name='user' ) `
      );
      return results;
    } catch (error) {
      return error;
    }
  }
  //return no of avilable items in system
  async itemCount() {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT COUNT(id) FROM items WHERE avilability=true`
      );
      return results;
    } catch (error) {
      return error;
    }
  }
  //returns no of unfinished order for given date
  async pendingordercount(dates) {
    try {
      let current_date;
      const date = new Date().toISOString().slice(0, 10);
      current_date = date.split("-").join("");
      if (dates.when) {
        current_date = dates.when;
      }
      const [results, meatdata] = await sequelize.query(
        `SELECT COUNT(id) FROM orders WHERE created_at::timestamp::date=TO_DATE('${current_date}','YYYYMMDD') AND status=false`
      );
      return results;
    } catch (error) {
      return error;
    }
  }
}
module.exports = new CountService();
