const ItemService = require("../services/item.service");
const GlobalResponse = require("../utils/globalResponse.utils");
class ItemController {
  async create(req, res, next) {
    try {
      const itemData = req.body;
      itemData.avilability = true;
      const savedItem = await ItemService.create(itemData);
      return GlobalResponse(res, 200, "New Item Added Successfully", savedItem);
    } catch (error) {
      next(error);
    }
  }
  async ChangeAvilability(req, res, next) {
    try {
      const whose = await ItemService.findById(req.body.item_id);
      if (whose === null) {
        return GlobalResponse(res, 404, "The Item Is Not Avilable", null);
      }
      const updated = await ItemService.ChangeAvilability(req.body.item_id);
      return GlobalResponse(
        res,
        200,
        "Item Avilability Changed Successfully",
        updated
      );
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    // console.log('called');
    try {
      const items = await ItemService.findAll();
      // console.log(items);
      return GlobalResponse(res, 200, "All Items In The System", items);
    } catch (error) {
      next(error);
    }
  }
  async findAllAvilable(req, res, next) {
    // console.log('called');
    try {
      const items = await ItemService.findAllAvilable();
      // console.log(items);
      return GlobalResponse(res, 200, "All Items In The System", items);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const item = await ItemService.findById(req.params.itemId);
      // console.log(item);
      if (item === null) {
        return GlobalResponse(res, 404, "The Item Is Not Avilable", null);
      }
      return GlobalResponse(res, 200, "The Item Matching Id", item);
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }
  async modifyItem(req, res, next) {
    try {
      const item = await ItemService.findById(req.params.itemId);
      // console.log(item);
      if (item === null) {
        return GlobalResponse(res, 404, "The Item Is Not Avilable", null);
      }
      const itemData = req.body;
      const modifiedItem = await ItemService.modifyItem(
        req.params.itemId,
        itemData
      );
      return GlobalResponse(
        res,
        200,
        "Item Modifictaion success",
        modifiedItem
      );
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ItemController();
