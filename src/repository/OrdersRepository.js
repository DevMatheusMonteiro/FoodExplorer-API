const knex = require("../database/knex");
class OrdersRepository {
  async findById({ id, user_id }) {
    const order = await knex("orders").where({ id, user_id }).first();
    return order;
  }
  async findOrdersWithStatus({ status, user_id, page }) {
    const orders = await knex("orders")
      .where({ status, user_id })
      .limit(5)
      .offset(page)
      .orderBy("updated_at", "desc");
    return orders;
  }
  async totalOrdersWithStatus({ status, user_id }) {
    const [totalOrders] = await knex("orders")
      .where({ status, user_id })
      .count();
    return totalOrders["count(*)"];
  }
  async findOrdersWithoutStatus({ user_id, page }) {
    const orders = await knex("orders")
      .where({ user_id })
      .limit(5)
      .offset(page)
      .orderBy("updated_at", "desc");
    return orders;
  }
  async totalOrdersWithoutStatus(user_id) {
    const [totalOrders] = await knex("orders").where({ user_id }).count();
    return totalOrders["count(*)"];
  }
  async create({ paymentMethod, amount, user_id, address_id }) {
    const [order_id] = await knex("orders").insert({
      paymentMethod,
      amount,
      user_id,
      address_id,
    });
    return order_id;
  }
}
module.exports = OrdersRepository;
