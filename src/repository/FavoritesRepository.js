const knex = require("../database/knex");
class FavoritesRepository {
  async findById({ id, user_id }) {
    const favorite = await knex("favorites").where({ id, user_id }).first();
    return favorite;
  }
  async findByUserId(user_id) {
    const favorites = await knex("favorites")
      .select("favorites.id", "favorites.product_id", "favorites.user_id")
      .where({ user_id })
      .innerJoin("products", "favorites.product_id", "products.id");
    return favorites;
  }
  async findByProductIdAndUserId({ product_id, user_id }) {
    const favorite = await knex("favorites")
      .where({ product_id, user_id })
      .first();
    return favorite;
  }
  async create({ product_id, user_id }) {
    const [favorite_id] = await knex("favorites").insert({
      product_id,
      user_id,
    });
    return favorite_id;
  }
  async delete(id) {
    await knex("favorites").delete().where({ id });
    return id;
  }
}
module.exports = FavoritesRepository;
