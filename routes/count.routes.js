const isAdmin = require("../middlewares/isAdmin.midlleware");
const passport = require("passport");
const CountController = require("../controllers/count.controller");
module.exports = (app) => {
  app
    .route("/api/staffcount")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      CountController.staffcount
    );
  app
    .route("/api/customercount")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      CountController.customercount
    );
  app
    .route("/api/itemcount")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      CountController.itemscount
    );
  app
    .route("/api/pendingordercount")
    .get(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      CountController.pendingordercount
    );
};
