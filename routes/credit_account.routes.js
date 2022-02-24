const CreditAccountController = require("../controllers/credit_account.controller");
const passport = require("passport");
const isAdmin = require("../middlewares/isAdmin.midlleware");
module.exports = (app) => {
  //for testing only avilable to only admin
  app
    .route("/api/creditaccounts")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      CreditAccountController.create
    );
  //get logined user credit detail avlable to all user
  app
    .route("/api/creditaccounts")
    .get(
      passport.authenticate("jwt", { session: false }),
      CreditAccountController.findMyCredit
    );
  //get a credit of a user by admin and staff only
  app
    .route("/api/creditaccounts/get")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      CreditAccountController.findHisCredit
    );
};
