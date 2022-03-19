const Joi = require("joi");
module.exports = Joi.object({
  user_id: Joi.number().required(),
  role_id: Joi.number().required(),
});
