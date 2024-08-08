const knex = require("../database/knex");
class FeedbacksRepository {
  async findByOrderIdList(order_ids) {
    const feedback = await knex("feedbacks").whereIn("order_id", order_ids);
    return feedback;
  }
  async create({ rating, comment, order_id }) {
    const [feedback_id] = await knex("feedbacks").insert({
      rating,
      comment,
      order_id,
    });
    return feedback_id;
  }
}
module.exports = FeedbacksRepository;
