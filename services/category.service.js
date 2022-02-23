const res = require('express/lib/response');
const {category} = require('../DB/index');
class CategoryService{
    async create(categoryData){
        try {
            const savedCategory = await category.create(categoryData);
            return savedCategory;
        } catch (error) {
            return error;
        }
    }
    async findById(cid){
        try {
            const which = await category.findOne({
                where:{
                    id:cid
                },
                attributes:['name']
            })
            return which;
        } catch (error) {
            return error
        }
    }
    async findAll(){
        try {
            const categories = await category.findAll({
                attributes:['name']
            });
            return categories;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new CategoryService();