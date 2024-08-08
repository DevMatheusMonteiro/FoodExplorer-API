const Router = require("express");
const UsersController = require("../controllers/UsersController");
const UserValidationController = require("../controllers/UserValidationController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersRoutes = Router();
const usersController = new UsersController();
const userValidationController = new UserValidationController();
usersRoutes.post("/", usersController.create);
usersRoutes.use(ensureAuthenticated);
usersRoutes.put("/", usersController.update);
usersRoutes.delete("/", usersController.delete);
usersRoutes.get("/validate", userValidationController.show);

module.exports = usersRoutes;
