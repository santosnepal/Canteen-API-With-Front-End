const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');
class UserController{
    async create(req,res,next){
        try {
            const userData = req.body;
            userData.profile_pic = req.file.path;
            const password = await bcrypt.hash(userData.password,10);
            userData.password = password;
            const result = await UserService.create(userData);
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new UserController();