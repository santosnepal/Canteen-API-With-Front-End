const OrderController = require("../controllers/order.controller");
const isAdmin = require("../middlewares/isAdmin.midlleware");
const passport = require("passport");
const validator = require("../middlewares/validator.middleware");
const orderSchema = require("../schemas/order.schema");
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
      passport.authenticate(
        "jwt",
        { session: false },
        isAdmin,
        OrderController.getAllRemainingOrder
      )
    );
  //change order status only admin or staff
  app
    .route("/api/orders/complete")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      OrderController.changeStatus
    );
};
