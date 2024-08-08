const AppError = require("../utils/AppError");
class OrdersStatusService {
  constructor(ordersStatusRepository, usersRepository) {
    this.ordersStatusRepository = ordersStatusRepository;
    this.usersRepository = usersRepository;
  }
  async update({ id, status, user_id }) {
    const user = await this.usersRepository.findById(user_id);
    let order;
    if (user.role == "customer") {
      order = await this.ordersStatusRepository.findByIdAndUserId({
        id,
        user_id,
      });
    } else {
      order = await this.ordersStatusRepository.findById(id);
    }
    if (!order) {
      throw new AppError("Pedido não encontrado!", 404);
    }
    const order_id = await this.ordersStatusRepository.update({
      id: order.id,
      status,
    });
    return order_id;
  }
}
module.exports = OrdersStatusService;
