const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");
const ValidationException = require("../exceptions/validationException");
const isAdmin = require("../utils/isAdmin.utils");
const GlobalResponse = require("../utils/globalResponse.utils");
const bcrypt = require("bcrypt");
class UserController {
  async me(req, res, next) {
    try {
      const me = await UserService.findByid(req.user.id);
      return GlobalResponse(res, 200, "My Details", me);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      console.log("called", req.body);
      const userData = req.body;
      if (!req.file) {
        console.log("file problem");
        return next(
          new ValidationException(false, "Missing Profile Picture Image", null)
        );
      }
      userData.profile_pic = req.file.path;
      const roleId = await RoleService.findByRoleName("user");
      const idFromDb = roleId.id || null;
      const password = await bcrypt.hash(userData.password, 10);
      userData.password = password;
      const result = await UserService.create(userData, idFromDb);
      GlobalResponse(res, 200, "Registration Success", result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async findAll(req, res, next) {
    try {
      const users = await UserService.findAll();
      GlobalResponse(
        res,
        200,
        "All users in system with asociiated role",
        users
      );
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    // console.log('here');
    try {
      const ud = await UserService.login(req.body);
      // console.log(ud);
      if (ud.success === false) {
        return next(new ValidationException(401, "Wrong Credental", null));
      }
      return GlobalResponse(res, 200, "Login Success", ud);
    } catch (error) {
      next(error);
    }
  }
  async editUser(req, res, next) {
    try {
      if (req.params.userId) {
        if (!isAdmin(req.user.id)) {
          return next(new ValidationException(false, "Un authorized", null));
        }
        const userId = req.params.userId;
        const avilable = await UserService.findByid(userId);
        if (avilable === null) {
          return GlobalResponse(
            res,
            404,
            "User Is Not Avilable In System",
            null
          );
        }
        const data = req.body;
        if (req.file) {
          data.profile_pic = req.file.path;
        }
        const editedUser = await UserService.editUser(userId, data);
        return GlobalResponse(res, 200, "user Edit success", editedUser);
      }
      const userId = req.user.id;
      const data = req.body;
      if (req.file) {
        data.profile_pic = req.file.path;
      }
      const editedUser = await UserService.editUser(userId, data);
      return GlobalResponse(res, 200, "user Edit success", editedUser);
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req, res, next) {
    try {
      if (req.params.userId) {
        if (!isAdmin(req.user.id)) {
          return next(new ValidationException(false, "Un authorized", null));
        }
        const userId = req.params.userId;
        const avilable = await UserService.findByid(userId);
        if (avilable === null) {
          return GlobalResponse(
            res,
            404,
            "Password Change fail / user not avilable in system",
            null
          );
        }
        const rawPassword = req.body.password;
        const password = await bcrypt.hash(rawPassword, 10);
        const editedUser = await UserService.changePassword(userId, password);
        return GlobalResponse(res, 200, "Password Change success", editedUser);
      }
      const savedPassword = await UserService.findByid(req.user.id);
      const rawPassword = req.body.password;
      const oldPassword = req.body.old_password;
      const matched = await bcrypt.compare(
        oldPassword,
        savedPassword.dataValues.password
      );
      if (!matched) {
        return GlobalResponse(
          res,
          404,
          "Password Change fail / old password donot match",
          null
        );
      }
      const passwords = await bcrypt.hash(rawPassword, 10);
      const editedUser = await UserService.changePassword(
        req.user.id,
        passwords
      );
      return GlobalResponse(res, 200, "Password Chnage success", editedUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = new UserController();
