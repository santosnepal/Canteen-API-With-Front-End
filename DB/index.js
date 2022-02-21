const Sequelize = require('sequelize');
const users = require('../Models/users.model');
const roles = require('../Models/roles.model');
const users_roles = require('../Models/user_role.model');


//database configurations
const DB_USERNAME="postgres";
const DB_PASSWORD="codecamp";
const DB_NAME="canteen";
const DB_HOST="localhost";
const DB_PORT="5432";
const DIALECT="postgres";
const db = {}
const sequelize = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    dialect:DIALECT,
    host:DB_HOST,
    port:DB_PORT,
    pool: {
        max:20,
        idle:30000,
        min:5
    },
    define:{
        underscored:true
    }
});
// defining many to many relation between user and role
const userModel = users(sequelize,Sequelize.DataTypes);
const roleModel = roles(sequelize,Sequelize.DataTypes);
const usersrolesModel = users_roles(sequelize,Sequelize.DataTypes);

userModel.belongsToMany(roleModel,{through:usersrolesModel});
roleModel.belongsToMany(userModel,{through:usersrolesModel});
db.user = userModel;
db.role = roleModel;
db.users_role = usersrolesModel;
db.sequelize = sequelize;
module.exports = db;

