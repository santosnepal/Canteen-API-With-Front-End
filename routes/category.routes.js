const CategoryController = require('../controllers/category.contoller');
const passport = require('passport');
const isAdmin = require('../middlewares/isAdmin.midlleware');
const validator = require('../middlewares/validator.middleware')
const categorySchema = require('../schemas/category.schema');
module.exports = (app) =>{
    //protected route to add new category only access to admin
    app.route('/api/categories')
        .post(passport.authenticate('jwt',{session:false}),validator(categorySchema),isAdmin,CategoryController.create);
    //public route find a category by id
    app.route('/api/categories/id/:cateoryId')
        .get(passport.authenticate('jwt',{session:false}),CategoryController.findById);
    //public find all categories
    app.route('/api/categories')
        .get(passport.authenticate('jwt',{session:false}),CategoryController.findAll);
}