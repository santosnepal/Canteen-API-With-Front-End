const { item, category } = require("../DB/index");
class ItemService {
  async create(itemData) {
    try {
      const savedItem = await item.create(itemData);
      return savedItem;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
  async ChangeAvilability(iid) {
    try {
      const which = await item.findOne({
        where: { id: iid },
      });
      //   console.log('here',which);
      which.avilability = !which.avilability;
      await which.save();
      return { success: true };
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    try {
      const items = item.findAll({
        include: {
          model: category,
          attributes: ["name"],
        },
        attributes: ["name", "price", "avilability", "id"],
      });
      return items;
    } catch (error) {
      return error;
    }
  }
  async findAllAvilable() {
    try {
      const items = item.findAll({
        where: { avilability: true },
        include: {
          model: category,
          attributes: ["name"],
        },
        attributes: ["name", "price", "avilability", "id"],
      });
      return items;
    } catch (error) {
      return error;
    }
  }
  async findById(iid) {
    try {
      const items = item.findOne({
        where: { id: iid },
        include: {
          model: category,
          attributes: ["name"],
        },
        attributes: ["name", "price", "avilability"],
      });
      return items;
    } catch (error) {
      return error;
    }
  }
  async modifyItem(itemId, itemData) {
    try {
      const which = await item.findOne({ where: { id: itemId } });
      which.name = itemData.name || which.name;
      which.category_id = itemData.category_id || which.category_id;
      which.price = itemData.price || which.price;
      const modifiedItem = await which.save();
      return modifiedItem;
    } catch (error) {
      return error;
    }
  }
}
module.exports = new ItemService();
