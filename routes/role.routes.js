const RoleController = require('../controllers/role.controller');
module.exports = (app) =>{
    app.route('/api/roles')
        .post(RoleController.create);
    app.route('/api/roles')
        .get(RoleController.findAll);
}