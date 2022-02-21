const {user} = require('../DB/index');
class UserService{
    async create(userData){
        try {
            const savedUser = await user.create(userData);
            return savedUser;
        } catch (error) {
            return error;
        }
    }
}
module.exports = new UserService();