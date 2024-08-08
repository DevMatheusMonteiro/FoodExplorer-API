const AppError = require("../utils/AppError");
class FeedbacksService {
  constructor(feedbacksRepository, ordersRepository) {
    this.feedbacksRepository = feedbacksRepository;
    this.ordersRepository = ordersRepository;
  }
  async create({ rating, comment, order_id, user_id }) {
    const order = await this.ordersRepository.findById({
      id: order_id,
      user_id,
    });
    if (!order) {
      throw new AppError("Pedido não encontrado!", 404);
    }
    const [feedback] = await this.feedbacksRepository.findByOrderIdList([
      order.id,
    ]);
    if (feedback) {
      throw new AppError("Esse pedido já contém um feedback!");
    }

    if (rating < 1 || rating > 5) {
      throw new AppError("Nota deve ser de 1 a 5");
    }
    const feedback_id = await this.feedbacksRepository.create({
      rating,
      comment,
      order_id,
    });
    return { id: feedback_id };
  }
}
module.exports = FeedbacksService;
