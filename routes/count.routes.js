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
};
