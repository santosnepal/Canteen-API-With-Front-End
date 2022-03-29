const Joi = require("joi");
const filterSchemma = Joi.object({
  start: Joi.string().required(),
  end: Joi.string().required(),
});
module.exports = filterSchemma;
