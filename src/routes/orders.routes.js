const Router = require("express");
const OrdersController = require("../controllers/OrdersController");
const OrdersStatusController = require("../controllers/OrdersStatusController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ordersRoutes = Router();
const ordersController = new OrdersController();
const ordersStatusController = new OrdersStatusController();
ordersRoutes.use(ensureAuthenticated);
ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.patch("/:id", ordersStatusController.update);
module.exports = ordersRoutes;
