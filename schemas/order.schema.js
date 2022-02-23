const Joi = require("joi");
const orderSchema = Joi.object({
  item_id: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
});
module.exports = orderSchema;
