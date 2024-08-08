const knex = require("../database/knex");
class IngredientsRepository {
  async findByName(name) {
    const ingredients = await knex("ingredients").whereLike(
      "ingredients.name",
      `%${name}%`
    );
    return ingredients;
  }
  async findByProductId(product_id) {
    const ingredients = await knex("ingredients").where({ product_id });

    return ingredients;
  }
  async all() {
    const ingredients = await knex("ingredients").select().orderBy("name");
    return ingredients;
  }
  async create({ name, product_id }) {
    const [ingredient_id] = await knex("ingredients").insert({
      name,
      product_id,
    });
    return ingredient_id;
  }
  async deleteByNameAndProductId({ name, product_id }) {
    await knex("ingredients").where({ name, product_id }).delete();
    return name;
  }
}
module.exports = IngredientsRepository;
