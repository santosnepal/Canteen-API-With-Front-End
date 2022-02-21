const UserController = require('../controllers/user.controller');
const {upload} = require('../multer/multer');
const validator = require('../middlewares/validator.middleware');
const {userSchema} = require('../schemas/user.schema');
module.exports = (app)=>{
    app.route('/api/users')
        .post(upload.single('image'),validator(userSchema),UserController.create);
}