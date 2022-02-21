const UserRolesService = require('../services/user_roles.service');
class UserRolesController{
    async create(req,res,next){
        try {
            const body = req.body;
            const savedData = await UserRolesService.create(body);
            res.status(200).json(savedData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserRolesController();