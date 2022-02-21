const {role} = require('../DB/index');
class RoleService{
    async create(roleData){
        try {
            const savedRole = await role.create(roleData);
            return savedRole;
        } catch (error) {
            return error;
        }
    }
    async findAll(){
        try {
            const roles = await role.findAll();
            return roles;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new RoleService();