const ValidationException = require('../exceptions/validationException');
const validator = (schema) =>{
    return (req,res,next) => {
        try {
            const {error,value} = schema.validate(req.body);
            if(error){
                let errors = [];
                errors = error.details.map((dtr)=>{
                    return dtr.message;
                })
                throw new ValidationException(false,'Check Your Input',errors);
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}
module.exports = validator;