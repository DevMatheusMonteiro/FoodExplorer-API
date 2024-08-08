const Router = require("express");
const EmployeesController = require("../controllers/EmployeesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const employeesController = new EmployeesController();
const employeesRoutes = Router();
employeesRoutes.use(ensureAuthenticated);
employeesRoutes.use(verifyUserAuthorization(["admin"]));
employeesRoutes.post("/", employeesController.create);
employeesRoutes.get("/", employeesController.index);
employeesRoutes.get("/:id", employeesController.show);
employeesRoutes.put("/:id", employeesController.update);
employeesRoutes.delete("/:id", employeesController.delete);

module.exports = employeesRoutes;
