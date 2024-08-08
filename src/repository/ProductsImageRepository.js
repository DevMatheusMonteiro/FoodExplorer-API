const knex = require("../database/knex");
class ProductsImageRepository {
  async findById(id) {
    const product = await knex("products").where({ id }).first();
    return product;
  }
  async update({ id, image }) {
    const [product_id] = await knex("products")
      .update({ image, updated_at: knex.fn.now() }, ["id"])
      .where({ id });
    return product_id;
  }
}
module.exports = ProductsImageRepository;
