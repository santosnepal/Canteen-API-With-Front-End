const RoleController = require('../controllers/role.controller');
const isAdmin = require('../middlewares/isAdmin.midlleware');
const passport = require('passport');
module.exports = (app) =>{
    //add a new role 
    app.route('/api/roles')
        .post(passport.authenticate('jwt',{session:false}),isAdmin,RoleController.create);
    //get all roles in system
    app.route('/api/roles')
        .get(passport.authenticate('jwt',{session:false}),isAdmin,RoleController.findAll);
}