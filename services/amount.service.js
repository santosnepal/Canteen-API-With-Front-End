const { sequelize } = require("../DB");

class AmountService {
  //returns amount to pay by deducting sum of paid account from sum of total amount of completed orders
  async findTotalCreditAmount(wuserId) {
    try {
      const [results, metadata] =
        await sequelize.query(`SELECT ((SELECT SUM(total) from (SELECT  d.useri as userId,d.user as user,c.name as itemName , c.price as Price ,(c.price*d.quantity) as total
        FROM items  c , (SELECT a.quantity as quantity , a.item_id as itemId,a.user_id as userId ,f.name as user,f.id as useri
        FROM orders a, credit_account b, users f
        WHERE a.id = b.order_id AND f.id = a.user_id
        ) d 
        WHERE c.id = d.itemId) long
        where long.userId = ${wuserId})-(SELECT COALESCE((SELECT SUM(amount) FROM paid_account WHERE user_id = ${wuserId}),0)
        )) as amount_to_pay
        `);
      return results;
    } catch (error) {
      return error;
    }
  }
}
module.exports = new AmountService();
