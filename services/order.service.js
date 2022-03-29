const { order, user, item, sequelize } = require("../DB/index");
const credit_accountService = require("./credit_account.service");
class UserService {
  async create(orderData) {
    try {
      const savedOrder = await order.create(orderData);
      return savedOrder;
    } catch (error) {
      return error;
    }
  }
  async findById(oid) {
    try {
      const found = await order.findOne({
        where: {
          id: oid,
        },
        include: [
          {
            model: user,
            attributes: ["id", "name"],
          },
          {
            model: item,
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id", "quantity", "status"],
      });
      return found;
    } catch (error) {
      return error;
    }
  }
  async changeStatus(which) {
    try {
      const found = await order.findOne({
        where: {
          id: which,
        },
      });
      found.status = !found.status;
      await found.save();
      if (found.status) {
        await credit_accountService.create({
          user_id: found.user_id,
          order_id: found.id,
        });
        return {
          status: "completed",
          message:
            "The order has been completed and deliverd to customer and amount recorded in credit",
        };
      }
      await credit_accountService.deleteByOrderId(found.id);
      return {
        status: "not completed",
        message:
          "The order has been marked as not completed and amount removed from credit",
      };
    } catch (error) {
      return error;
    }
  }
  async getAllRemainingOrder() {
    try {
      const orders = await order.findAll({
        where: { status: false },
        include: [
          {
            model: user,
            attributes: ["id", "name"],
          },
          {
            model: item,
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id", "quantity"],
      });
      return orders;
    } catch (error) {
      //   console.log(error);
      return error;
    }
  }
  async deletedAOreder(orderId) {
    try {
      await order.destroy({
        where: { id: orderId },
      });
      return { success: true, message: "The Order has been removed" };
    } catch (error) {
      return error;
    }
  }
  async getTodaysRemainingOrder() {
    try {
      let current_date;
      const date = new Date().toISOString().slice(0, 10);
      current_date = date.split("-").join("");
      const [results, metadata] = await sequelize.query(`
      SELECT "orders"."id", "orders"."quantity", "user"."id" AS "user_id", "user"."name" AS "user_name", "user"."profile_pic" AS "user_profile_pic","item"."id" AS "item_id", "item"."name" AS "item_name" FROM "orders" AS "orders" LEFT OUTER JOIN "users" AS "user" ON "orders"."user_id" = "user"."id" LEFT OUTER JOIN "items" AS "item" ON "orders"."item_id" = "item"."id" WHERE "orders"."status" = false AND orders.created_at::timestamp::date=TO_DATE('${current_date}','YYYYMMDD')
      `);
      // console.log(results);
      return results;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
  async getTodaysAllOrder() {
    try {
      let current_date;
      const date = new Date().toISOString().slice(0, 10);
      current_date = date.split("-").join("");
      const [results, metadata] = await sequelize.query(`
      SELECT "orders"."id", "orders"."quantity","orders"."status", "user"."id" AS "user_id", "user"."name" AS "user_name", "user"."profile_pic" AS "user_profile_pic","item"."id" AS "item_id", "item"."name" AS "item_name" FROM "orders" AS "orders" LEFT OUTER JOIN "users" AS "user" ON "orders"."user_id" = "user"."id" LEFT OUTER JOIN "items" AS "item" ON "orders"."item_id" = "item"."id" WHERE  orders.created_at::timestamp::date=TO_DATE('${current_date}','YYYYMMDD')
      `);
      // console.log(results);
      return results;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
  async getMyTodaysOrder(userid) {
    try {
      let current_date;
      const date = new Date().toISOString().slice(0, 10);
      current_date = date.split("-").join("");
      const [results, metadata] = await sequelize.query(`
      SELECT "orders"."id", "orders"."quantity","orders"."status", "user"."id" AS "user_id", "user"."name" AS "user_name", "user"."profile_pic" AS "user_profile_pic","item"."id" AS "item_id", "item"."name" AS "item_name" ,"item"."price" as "item_price" FROM "orders" AS "orders" LEFT OUTER JOIN "users" AS "user" ON "orders"."user_id" = "user"."id" LEFT OUTER JOIN "items" AS "item" ON "orders"."item_id" = "item"."id" WHERE "orders"."user_id"=${userid} AND "orders"."status" =false AND orders.created_at::timestamp::date=TO_DATE('${current_date}','YYYYMMDD')
      `);
      return results;
    } catch (error) {
      return error;
    }
  }
  async modifyOrder(orderId, orderData) {
    try {
      const which = await order.findOne({
        where: {
          id: orderId,
        },
      });
      which.quantity = orderData.quantity || which.quantity;
      which.item_id = orderData.item_id || which.item_id;
      const modifiedOrder = await which.save();
      return modifiedOrder;
    } catch (error) {
      return error;
    }
  }
  async myFilteredOrder(userId, startdate, enddate) {
    try {
      const [results, metadata] =
        await sequelize.query(`SELECT  users.name,users.id as userid,credit_account.id,credit_account.order_id, orders.item_id,orders.quantity,orders.updated_at
      ,orders.quantity*items.price as total ,items.name,items.price
      from credit_account 
      INNER JOIN users 
      ON users.id = credit_account.user_id
      INNER JOIN orders 
      ON   credit_account.user_id = ${userId} and credit_account.order_id = orders.id  
      INNER JOIN items 
      ON orders.item_id = items.id and orders.updated_at BETWEEN TO_DATE('${startdate}','YYYYMMDD') AND 
      TO_DATE('${enddate}','YYYYMMDD')
      
      `);
      // console.log(results);
      return results;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
}
module.exports = new UserService();
