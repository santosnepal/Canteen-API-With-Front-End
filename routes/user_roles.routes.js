const UserRolesController = require('../controllers/user_roles.controller');
module.exports = (app) =>{
    app.route('/api/user_roles')
        .post(UserRolesController.create);
} 