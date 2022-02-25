const PaidAccountController = require("../controllers/paid_account.controller");
const isAdmin = require("../middlewares/isAdmin.midlleware");
const paid_account_schema = require("../schemas/paid_account.schema");
const validator = require("../middlewares/validator.middleware");
const passport = require("passport");
module.exports = (app) => {
  //add money by a user in db only avilable to admin
  app
    .route("/api/paidaccounts")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      validator(paid_account_schema),
      PaidAccountController.create
    );
  //get loginned user paid amount
  app
    .route("/api/paidaccounts/get")
    .get(
      passport.authenticate("jwt", { session: false }),
      PaidAccountController.findMyPaidHistory
    );
  //get a paid amount detail of a user by only admin
  app
    .route("/api/paidaccounts/get/:userId")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      PaidAccountController.findHisPaidHistory
    );
};
