const Joi = require("joi");
const userSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    phone_no:Joi.number().required(),
    password:Joi.string().required(),
})
module.exports = {userSchema};