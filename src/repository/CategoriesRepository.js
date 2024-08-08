const knex = require("../database/knex");
class CategoriesRepository {
  async findByName(name) {
    const category = await knex("categories").where({ name }).first();
    return category;
  }
  async findById(id) {
    const category = await knex("categories").where({ id }).first();
    return category;
  }
  async all() {
    const categories = await knex("categories").select().orderBy("name");
    return categories;
  }
  async show(id) {
    const category = await knex("categories").where({ id }).first();
    return category;
  }
  async create(name) {
    const [category] = await knex("categories").insert({ name });
    return category;
  }
  async delete(id) {
    await knex("categories").where({ id }).delete();
    return id;
  }
}
module.exports = CategoriesRepository;
