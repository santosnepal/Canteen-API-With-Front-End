const UserController = require("../controllers/user.controller");
const { upload } = require("../multer/multer");
const validator = require("../middlewares/validator.middleware");
const { userSchema } = require("../schemas/user.schema");
const userLoginSchema = require("../schemas/userLogin.schema");
const Passport = require("passport");
const isAdmin = require("../middlewares/isAdmin.midlleware");
const { userSide, adminSide } = require("../schemas/changePasswword.schema");
module.exports = (app) => {
  //add new user
  app
    .route("/api/users")
    .post(upload.single("image"), validator(userSchema), UserController.create);
  //get all users with assocated role only for admin
  app
    .route("/api/users")
    .get(
      Passport.authenticate("jwt", { session: false }),
      isAdmin,
      UserController.findAll
    );
  //login a user
  app
    .route("/api/users/login")
    .post(validator(userLoginSchema), UserController.login);
  //edit a user by self user
  app
    .route("/api/users/edit/me")
    .post(
      Passport.authenticate("jwt", { session: false }),
      upload.single("image"),
      UserController.editUser
    );
  //edit a user by admin
  app
    .route("/api/users/edit/:userId")
    .post(
      Passport.authenticate("jwt", { session: false }),
      isAdmin,
      upload.single("image"),
      UserController.editUser
    );
  app
    .route("/api/users/changepassword/me")
    .post(
      Passport.authenticate("jwt", { session: false }),
      validator(userSide),
      UserController.changePassword
    );
  app
    .route("/api/users/changepassword/:userId")
    .post(
      Passport.authenticate("jwt", { session: false }),
      isAdmin,
      validator(adminSide),
      UserController.changePassword
    );
};
