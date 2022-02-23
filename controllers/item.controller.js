const ItemService = require('../services/item.service');
class ItemController{
    async create(req,res,next){
        try {
            const itemData = req.body;
            itemData.avilability = true;
            const savedItem = await ItemService.create(itemData);
            res.status(200).json(savedItem);
        } catch (error) {
            next(error);
        }
    }
    async ChangeAvilability(req,res,next){
        try {
            const whose = await ItemService.findById(req.body.item_id)
            if(!whose.length){
                res.status(404).json({updated:false,message:'The Item is not avilable'});
            }
            const updated = await ItemService.ChangeAvilability(req.body.item_id);
            res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req,res,next){
        // console.log('called');
        try {
            const items = await ItemService.findAll();
            // console.log(items);
            res.status(200).json(items)
        } catch (error) {
            next(error);
        }
    }
    async findById(req,res,next){
        try {
            const item = await ItemService.findById(req.params.itemId);
            // console.log(item);
            if(!item.length){
                res.status(404).json({found:false,message:'The Item is not avilable'})
            }
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }

    }
}
module.exports = new ItemController();