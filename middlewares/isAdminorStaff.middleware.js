const UserService = require("../services/user.service");
const ValidationException = require("../exceptions/validationException");
const isAdminOrStaff = async (req, res, next) => {
  try {
    const who = await UserService.findByid(req.user.id);
    let admin = false;
    let staff = false;
    who.roles.map((role) => {
      // console.log(role.dataValues.name);
      if (role.dataValues.name === "admin") {
        admin = true;
      }
      if (role.dataValues.name === "staff") {
        staff = true;
      }
    });
    // console.log(admin);
    if (!admin) {
      if (!staff) {
        throw new ValidationException(422, "Not Authorized", null);
      }
      // next()
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdminOrStaff;
