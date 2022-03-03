const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");
const ValidationException = require("../exceptions/validationException");
const isAdmin = require("../utils/isAdmin.utils");
const bcrypt = require("bcrypt");
class UserController {
  async create(req, res, next) {
    try {
      const userData = req.body;
      if (!req.file) {
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
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req, res, next) {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    // console.log('here');
    try {
      const ud = await UserService.login(req.body);
      // console.log(ud);
      res.json(ud);
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
          return res.status(404).json({
            status: false,
            message: "The user is not avilable in system",
          });
        }
        const data = req.body;
        if (req.file) {
          data.profile_pic = req.file.path;
        }
        const editedUser = await UserService.editUser(userId, data);
        return res.status(200).json(editedUser);
      }
      const userId = req.user.id;
      const data = req.body;
      if (req.file) {
        data.profile_pic = req.file.path;
      }
      const editedUser = await UserService.editUser(userId, data);
      return res.status(200).json(editedUser);
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
          return res.status(404).json({
            status: false,
            message: "The user is not avilable in system",
          });
        }
        const rawPassword = req.body.password;
        const password = await bcrypt.hash(rawPassword, 10);
        const editedUser = await UserService.changePassword(userId, password);
        return res.status(200).json(editedUser);
      }
      const savedPassword = await UserService.findByid(req.user.id);
      const rawPassword = req.body.password;
      const oldPassword = req.body.old_password;
      const matched = await bcrypt.compare(
        oldPassword,
        savedPassword.dataValues.password
      );
      if (!matched) {
        return res.status(422).json({
          status: false,
          message: "The password do not matched contatact admin",
        });
      }
      const passwords = await bcrypt.hash(rawPassword, 10);
      const editedUser = await UserService.changePassword(
        req.user.id,
        passwords
      );
      return res.status(200).json(editedUser);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserController();
