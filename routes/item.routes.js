const validator = require("../middlewares/validator.middleware");
const isAdmin = require("../middlewares/isAdmin.midlleware");
const ItemController = require("../controllers/item.controller");
const passport = require("passport");
const itemSchema = require("../schemas/item.schema");
module.exports = (app) => {
  //add a new Item avilable to only admin
  app
    .route("/api/items")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      validator(itemSchema),
      ItemController.create
    );
  //change item avilabilty avilable to only admin and staff
  app
    .route("/api/items/changeavilability")
    .post(
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      ItemController.ChangeAvilability
    );
  //get all item with its category avilable to all user
  app
    .route("/api/items")
    .get(
      passport.authenticate("jwt", { session: false }),
      ItemController.findAll
    );
  //get a item by its id with category avilable to all user
  app
    .route("/api/items/:itemId")
    .get(
      passport.authenticate("jwt", { session: false }),
      ItemController.findById
    );
};
