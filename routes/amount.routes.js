const isAdmin = require("../middlewares/isAdmin.midlleware");
const passport = require("passport");
const amountController = require("../controllers/amount.controller");
module.exports = (app) => {
  //get total paying amount of a user by admin and staff only
  app
    .route("/api/amounts")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      amountController.findHisTotalCreditAmount
    );
  //get total remaining paying amount of logined user
  app
    .route("/api/amounts")
    .get(
      passport.authenticate("jwt", { session: false }),
      amountController.FindMyTotalCreditAmount
    );
  app
    .route("/api/expenses")
    .get(
      passport.authenticate("jwt", { session: false }),
      amountController.TotalExpanses
    );
};
