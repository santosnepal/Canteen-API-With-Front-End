const {order} = require('../DB/index');
class UserService {
    async create(orderData){
        try {
            const savedOrder = await order.create(orderData);
            return savedOrder;
        } catch (error) {
            return error;
        }
    }
    async changeStatus(which){
        try {
            const found = await order.findOne({
                where:{
                    id:which
                }
            });
            found.status = true;
            await found.save();
            return{status:'completed',message:'The order has been completed and deliverd to customer'}
        } catch (error) {
            return error;
        }
    }
    async getAllRemainingOrder(){
        try {
            const orders = await order.findAll({
                where:{status:false},
                include:{
                    model:user,
                    attributes:['id','name']
                }
            })
            return orders;
        } catch (error) {
            return error;
        }
    }
}
module.exports = new UserService();
