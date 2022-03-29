const OrderController = require("../controllers/order.controller");
const isAdmin = require("../middlewares/isAdmin.midlleware");
const isAdminOrStaff = require("../middlewares/isAdminorStaff.middleware");
const passport = require("passport");
const validator = require("../middlewares/validator.middleware");
const orderSchema = require("../schemas/order.schema");
const filterSchemma = require("../schemas/filterhistory.schema");
module.exports = (app) => {
  //create a new order any user can do it
  app
    .route("/api/orders")
    .post(
      passport.authenticate("jwt", { session: false }),
      validator(orderSchema),
      OrderController.create
    );
  //get all remaing order only staff or admin can access
  app
    .route("/api/orders")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdminOrStaff,
      OrderController.getAllRemainingOrder
    );
  //get all todays remaining order only staff or admin
  app
    .route("/api/orders/today")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdminOrStaff,
      OrderController.getTodaysRemainingOrder
    );
  //get loginned user todays pending order
  app
    .route("/api/orders/today/my")
    .get(
      passport.authenticate("jwt", { session: false }),
      OrderController.getMyTodaysOrder
    );
  //get all todays all order
  app
    .route("/api/orders/today/all")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdminOrStaff,
      OrderController.getTodaysAllOrder
    );
  //change order status only admin or staff
  app
    .route("/api/orders/complete/:orderId")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdminOrStaff,
      OrderController.changeStatus
    );
  //get filtered result
  app
    .route("/api/orders/history/filtered")
    .post(
      passport.authenticate("jwt", { session: false }),
      validator(filterSchemma),
      OrderController.myFilteredOrder
    );
  //delete a order only by admin or orderer user
  app
    .route("/api/orders/delete")
    .post(
      passport.authenticate("jwt", { session: false }),
      OrderController.deleteAOrder
    );
  //modify a order only by who post the order
  app
    .route("/api/orders/modify/:orderId")
    .post(
      passport.authenticate("jwt", { session: false }),
      OrderController.modifyOrder
    );
};
