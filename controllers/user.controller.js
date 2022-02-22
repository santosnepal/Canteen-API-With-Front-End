const UserService = require('../services/user.service');
const ValidationException = require('../exceptions/validationException');
const bcrypt = require('bcrypt');
class UserController{
    async create(req,res,next){
        try {
            const userData = req.body;
            if (!req.file) {
                return next(new ValidationException(false,'Missing Profile Picture Image',null))
            }
            userData.profile_pic = req.file.path;
            const password = await bcrypt.hash(userData.password,10);
            userData.password = password;
            const result = await UserService.create(userData);
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
    async findAll(req,res,next){
        try {
            const users = await UserService.findAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
    async login(req,res,next){
        // console.log('here');
        try {
            const ud = await UserService.login(req.body);
            // console.log(ud);
            res.json(ud)
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new UserController();