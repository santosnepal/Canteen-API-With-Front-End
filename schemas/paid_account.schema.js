const Joi = require("joi");
const paid_account_schema = Joi.object({
  user_id: Joi.number().positive().required(),
  amount: Joi.number().positive().required(),
});
module.exports = paid_account_schema;
