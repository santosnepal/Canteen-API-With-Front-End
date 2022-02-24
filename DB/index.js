const Sequelize = require("sequelize");
const users = require("../Models/users.model");
const roles = require("../Models/roles.model");
const users_roles = require("../Models/user_role.model");
const category = require("../Models/category.model");
const item = require("../Models/items.model");
const order = require("../Models/order.model");
const credit_account = require("../Models/credit_account.model");

//database configurations
const DB_USERNAME = "postgres";
const DB_PASSWORD = "codecamp";
const DB_NAME = "canteen";
const DB_HOST = "localhost";
const DB_PORT = "5432";
const DIALECT = "postgres";
const db = {};
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  pool: {
    max: 20,
    idle: 30000,
    min: 5,
  },
  define: {
    underscored: true,
  },
});
//making imported model into db model
const userModel = users(sequelize, Sequelize.DataTypes);
const roleModel = roles(sequelize, Sequelize.DataTypes);
const usersrolesModel = users_roles(sequelize, Sequelize.DataTypes);
const categoryModel = category(sequelize, Sequelize.DataTypes);
const itemModel = item(sequelize, Sequelize.DataTypes);
const orderModel = order(sequelize, Sequelize.DataTypes);
const creditAccountModel = credit_account(sequelize, Sequelize.DataTypes);
//relation between item and category  category-items one to many
categoryModel.hasMany(itemModel);
itemModel.belongsTo(categoryModel);
//relationship between user and order
userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);
//relationship between order and item
itemModel.hasMany(orderModel);
orderModel.belongsTo(itemModel);
//relation between order and credit_account
orderModel.hasMany(creditAccountModel);
creditAccountModel.belongsTo(orderModel);
//relation between credit_account and user
userModel.hasMany(creditAccountModel);
creditAccountModel.belongsTo(userModel);
// defining many to many relation between user and role
userModel.belongsToMany(roleModel, { through: usersrolesModel });
roleModel.belongsToMany(userModel, { through: usersrolesModel });
db.user = userModel;
db.role = roleModel;
db.users_role = usersrolesModel;
db.category = categoryModel;
db.item = itemModel;
db.order = orderModel;
db.sequelize = sequelize;
module.exports = db;
