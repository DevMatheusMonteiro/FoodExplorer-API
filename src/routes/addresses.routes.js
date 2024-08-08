const Router = require("express");

const AddressesController = require("../controllers/AddressesController");

const AddressesSelectedController = require("../controllers/AddressesSelectedController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const categoriesRoutes = Router();

const addressesController = new AddressesController();

const addressesSelectedController = new AddressesSelectedController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post("/", addressesController.create);
categoriesRoutes.get("/", addressesController.index);
categoriesRoutes.get("/:id", addressesController.show);
categoriesRoutes.put("/:id", addressesController.update);
categoriesRoutes.delete("/:id", addressesController.delete);

categoriesRoutes.patch("/:id", addressesSelectedController.update);

module.exports = categoriesRoutes;
