const { user, role } = require("../DB/index");
const UserRoleService  = require('../services/user_roles.service');
const bcrypt = require('bcrypt');
const TokenGenerator = require('../middlewares/tokenGenerator');
class UserService {
  async findByid(userId){
    try {
      const users = await user.findOne({
        where:{
          id:userId
        },
        include: [
          {
            model: role,
            through:{
              attributes:[]
            },
            // attributes:[{exclude:['created_at','updated_at','id']}]
          },
        ],
      });
      return users;
    //   con
    } catch (error) {
      return error;
    }
  }
  async create(userData) {
    try {
      const savedUser = await user.create(userData);
      const role = {user_id:savedUser.id,role_id:4};
      await UserRoleService.create(role);
      const finalUser = await this.findByid(savedUser.id);
      // console.log(finalUser);
      return finalUser;
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    try {
      const users = await user.findAll({
        include: [
          {
            model: role,
            through:{
              attributes:[]
            },
            // attributes:[{exclude:['created_at','updated_at','id']}]
          },
        ],
      });
    //   console.log(users);
      return users;
    } catch (error) {
        console.log(error);
      return error;
    }
  }
      async login(UserData){
        try {
            const {email,password} = UserData 
            //get data of user from database
            const savedData =  await user.findOne({
               where:{email},
            });
            if(savedData === null){
                return {success:false,message:'Wrong Credentials'}
            }
            //compare passord of user
           const compared = await bcrypt.compare(password,savedData.password)
           // console.log(compared)
           if(compared){
               const token =  TokenGenerator({id:savedData.id});
               return {id:savedData.id,username:savedData.username,token}
           }
           else{
               return {success:false,error:'Wrong Credentials'}
           }
        } catch (error) {
            return error;
        }
    }
}
module.exports = new UserService();
