const RoleService = require('../services/role.service');
class RoleController{
    async create(req,res,next){
        try {
            const savedRole = await RoleService.create(req.body);
            res.status(200).json(savedRole);
        } catch (error) {
            next(error);
        }
    }
    async findAll(req,res,next){
        try {
            const roles = await RoleService.findAll();
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RoleController();