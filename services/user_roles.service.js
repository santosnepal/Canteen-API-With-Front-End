const {users_role} = require('../DB/index')
class UsersRolesService{
    async create(data){
        try {
            const savedData = await users_role.create(data);
            console.log(savedData);
            return savedData;                                                                                           
        } catch (error) {
            return error;
        }
    }
}
module.exports = new UsersRolesService();