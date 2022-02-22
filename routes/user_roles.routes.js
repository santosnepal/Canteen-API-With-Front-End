const UserRolesController = require('../controllers/user_roles.controller');
const isAdmin = require('../middlewares/isAdmin.midlleware');
const passport = require('passport');
module.exports = (app) =>{
    //assign a role to a user
    app.route('/api/user_roles')
        .post(passport.authenticate('jwt',{session:false}),isAdmin,UserRolesController.create);
} 