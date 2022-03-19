const UserRolesController = require("../controllers/user_roles.controller");
const isAdmin = require("../middlewares/isAdmin.midlleware");
const UserRoleSchema = require("../schemas/deleterole.schema");
const validator = require("../middlewares/validator.middleware");
const passport = require("passport");
module.exports = (app) => {
  //assign a role to a user
  app
    .route("/api/user_roles")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      UserRolesController.create
    );
  //delete a assigned role for a user
  app
    .route("/api/user_roles/delete")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      validator(UserRoleSchema),
      UserRolesController.delete_role
    );
};
