const CategoryService = require('../services/category.service');
class CategoryController{
    async create(req,res,next){
        try {
            const categoryData = req.body;
            const savedCategory = await CategoryService.create(categoryData);
            res.status(200).json(savedCategory);
        } catch (error) {
            next(error);
        }
    }
    async findById(req,res,next){
        try {
            const which = req.params.cateoryId;
            const found = await CategoryService.findById(which);
            if(found === null){
                res.status(404).json({status:false,message:'The Category is Not avilable'});
            }
            res.status(200).json(found);
        } catch (error) {
            next(error);
        }
    }
    async findAll(req,res,next){
        try {
            const categories = await CategoryService.findAll();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();