const FeedbacksRepository = require("../repository/FeedbacksRepository");
const OrdersRepository = require("../repository/OrdersRepository");
const FeedbacksService = require("../service/FeedbacksService");
const ordersRepository = new OrdersRepository();
const feedbacksRepository = new FeedbacksRepository();
const feedbacksService = new FeedbacksService(
  feedbacksRepository,
  ordersRepository
);
class FeedbacksController {
  async create(req, res) {
    const { rating, comment, order_id } = req.body;
    const user_id = req.user.id;
    await feedbacksService.create({
      rating,
      comment,
      order_id,
      user_id,
    });
    return res.status(201).json();
  }
}
module.exports = FeedbacksController;
