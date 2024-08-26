const AppError = require("../utils/AppError");
class SalesService {
  constructor(salesRepository, addressesRepository, feedbacksRepository) {
    this.salesRepository = salesRepository;
    this.feedbacksRepository = feedbacksRepository;
    this.addressesRepository = addressesRepository;
  }
  async index({ status, page }) {
    let orders;
    let total;
    if (status) {
      orders = await this.salesRepository.findOrdersWithStatus({
        status,
        page: page * 5,
      });
      total = await this.salesRepository.totalOrdersWithStatus(status);
    } else {
      orders = await this.salesRepository.findOrdersWithoutStatus(page * 5);
      total = await this.salesRepository.totalOrdersWithoutStatus();
    }
    const order_ids = orders.map((order) => order.id);
    const feedbacks = await this.feedbacksRepository.findByOrderIdList(
      order_ids
    );
    const sales = await this.salesRepository.findByOrderIdList(order_ids);
    const ordersWithSalesAndFeedbacks = orders.map((order) => {
      const orderFeedbacks = feedbacks.find(
        (feedback) => feedback.order_id == order.id
      );
      const orderSales = sales.filter((sale) => sale.order_id == order.id);
      return {
        ...order,
        rating: orderFeedbacks?.rating,
        comment: orderFeedbacks?.comment,
        products: orderSales,
      };
    });
    return { orders: ordersWithSalesAndFeedbacks, total };
  }
  async show(id) {
    const order = await this.salesRepository.findById(id);
    if (!order) {
      throw new AppError("Pedido não encontrado!", 404);
    }
    const [feedback] = await this.feedbacksRepository.findByOrderIdList([
      order.id,
    ]);
    const address = await this.addressesRepository.findById({
      id: order.address_id,
      user_id: order.user_id,
    });
    const sales = await this.salesRepository.findByOrderIdList([order.id]);
    return {
      ...order,
      address,
      rating: feedback?.rating,
      comment: feedback?.comment,
      products: sales,
    };
  }
}
module.exports = SalesService;
