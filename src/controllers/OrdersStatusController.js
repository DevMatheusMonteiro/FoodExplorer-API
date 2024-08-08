const OrdersStatusRepository = require("../repository/OrdersStatusRepository");
const UsersRepository = require("../repository/UsersRepository");
const OrdersStatusService = require("../service/OrdersStatusService");
const usersRepository = new UsersRepository();
const ordersStatusRepository = new OrdersStatusRepository();
const ordersStatusService = new OrdersStatusService(
  ordersStatusRepository,
  usersRepository
);
class OrdersStatusController {
  async update(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;
    await ordersStatusService.update({ id, status, user_id });
    return res.status(200).json();
  }
}
module.exports = OrdersStatusController;
