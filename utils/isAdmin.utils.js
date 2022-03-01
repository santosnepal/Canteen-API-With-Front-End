const UserService = require("../services/user.service");
const ValidationException = require("../exceptions/validationException");
const isAdmin = async (id) => {
  try {
    const who = await UserService.findByid(id);
    let admin = false;
    who.roles.map((role) => {
      // console.log(role.dataValues.name);
      if (role.dataValues.name === "admin") {
        admin = true;
      }
    });
    // console.log(admin);
    if (!admin) {
      return false;
      // next()
    }
    return true;
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
