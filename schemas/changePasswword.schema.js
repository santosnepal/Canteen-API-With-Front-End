const Joi = require("joi");
const changePasswordSchemaUser = Joi.object({
  password: Joi.string().required(),
  old_password: Joi.string().required(),
});
const changePasswordSchemaAdmin = Joi.object({
  password: Joi.string().required(),
});
const changePasswordSchemas = {
  userSide: changePasswordSchemaUser,
  adminSide: changePasswordSchemaAdmin,
};
module.exports = changePasswordSchemas;
