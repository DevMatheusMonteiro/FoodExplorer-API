const knex = require("../database/knex");
class SalesRepository {
  async findByOrderIdList(order_ids) {
    const sales = await knex("sales")
      .select(
        "products.id",
        "products.name",
        "products.description",
        "products.price",
        "products.image",
        "sales.id as sale_id",
        "sales.order_id",
        "sales.quantity"
      )
      .whereIn("sales.order_id", order_ids)
      .innerJoin("products", "sales.product_id", "products.id")
      .orderBy("products.name");
    return sales;
  }
  async findById(id) {
    const order = await knex("orders").where({ id }).first();
    return order;
  }
  async findOrdersWithStatus({ status, page }) {
    const orders = await knex("orders")
      .where({ status })
      .limit(5)
      .offset(page)
      .orderBy("updated_at", "desc");
    return orders;
  }
  async totalOrdersWithStatus(status) {
    const [totalOrders] = await knex("orders").where({ status }).count();
    return totalOrders["count(*)"];
  }
  async findOrdersWithoutStatus(page) {
    const orders = await knex("orders")
      .limit(5)
      .offset(page)
      .orderBy("updated_at", "desc");
    return orders;
  }
  async totalOrdersWithoutStatus() {
    const [totalOrders] = await knex("orders").count();
    return totalOrders["count(*)"];
  }
  async create({ quantity, product_id, order_id }) {
    const [sale] = await knex("sales").insert({
      quantity,
      product_id,
      order_id,
    });
    return sale;
  }
}
module.exports = SalesRepository;
