const UserService = require("../services/user.service");
const ValidationException = require("../exceptions/validationException");
const isAdmin = async (req, res, next) => {
  try {
    const who = await UserService.findByid(req.user.id);
    let admin = false;
    who.roles.map((role) => {
      // console.log(role.dataValues.name);
      if (role.dataValues.name === "admin") {
        admin = true;
      }
    });
    // console.log(admin);
    if (!admin) {
      throw new ValidationException(422, "Not Authorized", null);
      // next()
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
