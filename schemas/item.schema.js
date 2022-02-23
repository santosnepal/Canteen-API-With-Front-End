const Joi = require('joi');
const itemSchema = Joi.object({
    name:Joi.string().required(),
    category_id:Joi.number().positive().required(),
    price:Joi.number().positive().required(),
})
module.exports = itemSchema;