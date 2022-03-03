const { user, role, sequelize } = require("../DB/index");
const UserRoleService = require("../services/user_roles.service");
const bcrypt = require("bcrypt");
const TokenGenerator = require("../middlewares/tokenGenerator");
class UserService {
  async findByid(userId) {
    try {
      const users = await user.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: role,
            through: {
              attributes: [],
            },
            attributes: ["id", "name"],
            // attributes:[{exclude:['created_at','updated_at','id']}]
          },
        ],
      });
      return users;
      //   con
    } catch (error) {
      return error;
    }
  }
  async create(userData, roleId) {
    try {
      const savedUser = await user.create(userData);
      if (roleId === null) {
        const finalUser = await this.findByid(savedUser.id);
        // console.log(finalUser);
        return finalUser;
      }
      const role = { user_id: savedUser.id, role_id: roleId };
      await UserRoleService.create(role);
      const finalUser = await this.findByid(savedUser.id);
      // console.log(finalUser);
      return finalUser;
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    console.log("currently at ", process.cwd());
    const pwd = `localhost:9001${process.cwd()}`;
    console.log(pwd);
    try {
      const users = await user.findAll({
        include: [
          {
            model: role,
            through: {
              attributes: [],
            },
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id", "name", "email", "phone_no", "profile_pic"],
      });
      //   console.log(users);
      return users;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async login(UserData) {
    try {
      const { email, password } = UserData;
      //get data of user from database
      const savedData = await user.findOne({
        where: { email },
      });
      if (savedData === null) {
        return { success: false, message: "Wrong Credentials" };
      }
      //compare passord of user
      const compared = await bcrypt.compare(password, savedData.password);
      // console.log(compared)
      if (compared) {
        const token = TokenGenerator({ id: savedData.id });
        return { id: savedData.id, username: savedData.username, token };
      } else {
        return { success: false, error: "Wrong Credentials" };
      }
    } catch (error) {
      return error;
    }
  }
  async editUser(userId, data) {
    try {
      const which = await user.findOne({
        where: { id: userId },
      });
      which.name = data.name || which.name;
      which.email = data.email || which.email;
      which.phone_no = data.phone_no || which.phone_no;
      which.profile_pic = data.profile_pic || which.profile_pic;
      const edited = await which.save();
      return edited;
    } catch (error) {
      return error;
    }
  }
  async changePassword(userId, newPassword) {
    try {
      const which = await user.findOne({
        where: {
          id: userId,
        },
      });
      which.password = newPassword;
      await which.save();
      return { success: true, message: "Password Changed Successfully" };
    } catch (error) {
      return error;
    }
  }
}
module.exports = new UserService();
