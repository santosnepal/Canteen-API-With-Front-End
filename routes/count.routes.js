const isAdminOrStaff = require("../middlewares/isAdminorStaff.middleware");
const passport = require("passport");
const CountController = require("../controllers/count.controller");
module.exports = (app) => {
  app
    .route("/api/staffcount")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdminOrStaff,
      CountController.staffcount
    );
  app
    .route("/api/customercount")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdminOrStaff,
      CountController.customercount
    );
  app
    .route("/api/itemcount")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdminOrStaff,
      CountController.itemscount
    );
  app
    .route("/api/pendingordercount")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdminOrStaff,
      CountController.pendingordercount
    );
};
