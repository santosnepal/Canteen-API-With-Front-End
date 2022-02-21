const { user, role } = require("../DB/index");
class UserService {
  async create(userData) {
    try {
      const savedUser = await user.create(userData);
      return savedUser;
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    try {
      const users = await user.findAll({
        include: [
          {
            model: role,
            attributes: { exclude: ["id", "created_at", "updated_at"] },
          },
        ],
      });
    //   console.log(users);
      return users;
    } catch (error) {
        console.log(error);
      return error;
    }
  }
}
module.exports = new UserService();
