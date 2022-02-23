const { item,category } = require("../DB/index");
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
      which.avilability = !which.avilability
      await which.save();
      return {success:true}
    } catch (error) {
      return error;
    }
  }
  async findAll(){
      try {
          const items = item.findAll({
              include:{
                  model:category,
                  attributes:['name']
              },
              attributes:['name','price','avilability']
          })
          return items;
      } catch (error) {
          return error;
      }
  }
  async findById(iid){
    try {
        const items = item.findAll({
            where:{id:iid},
            include:{
                model:category,
                attributes:['name']
            },
            attributes:['name','price','avilability']
        })
        return items
    } catch (error) {
        return error;
    }
}
}
module.exports = new ItemService();
