const {users_role} = require('../DB/index')
class UsersRolesService{
    async create(data){
        try {
            const savedData = users_role.create(data);
            return savedData;                                                                                           
        } catch (error) {
            return error;
        }
    }
}
module.exports = new UsersRolesService();