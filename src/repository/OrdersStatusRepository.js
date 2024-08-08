const knex = require("../database/knex");
class OrdersStatusRepository {
  async findByIdAndUserId({ id, user_id }) {
    const order = await knex("orders").where({ id, user_id }).first();
    return order;
  }
  async findById(id) {
    const order = await knex("orders").where({ id }).first();
    return order;
  }
  async update({ id, status }) {
    const [order_id] = await knex("orders")
      .update(
        {
          status,
          updated_at: knex.fn.now(),
        },
        ["id"]
      )
      .where({ id });
    return order_id;
  }
}
module.exports = OrdersStatusRepository;
