const CategoryService = require("../services/category.service");
const GlobalResponse = require("../utils/globalResponse.utils");
class CategoryController {
  async create(req, res, next) {
    try {
      const categoryData = req.body;
      const savedCategory = await CategoryService.create(categoryData);
      return GlobalResponse(
        res,
        200,
        "New Category Addition Success",
        savedCategory
      );
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const which = req.params.cateoryId;
      const found = await CategoryService.findById(which);
      if (found === null) {
        return GlobalResponse(res, 404, "The Category is Not avilable", null);
      }
      return GlobalResponse(res, 200, "The Category Matching Id", found);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req, res, next) {
    try {
      const categories = await CategoryService.findAll();
      return GlobalResponse(
        res,
        200,
        "All Categories In The System",
        categories
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
