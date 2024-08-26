const knex = require("../database/knex");
class ProductsRepository {
  async findByName(name) {
    const product = await knex("products").where({ name }).first();
    return product;
  }
  async findByNameAndIngredients(search) {
    const products = await knex("products")
      .select(
        "products.id",
        "products.name",
        "products.description",
        "products.price",
        "products.image",
        "products.category_id",
        "products.created_at",
        "products.updated_at"
      )
      .distinct("products.id")
      .whereLike("products.name", `%${search}%`)
      .orWhereLike("ingredients.name", `%${search}%`)
      .innerJoin("ingredients", "products.id", "ingredients.product_id")
      .innerJoin("categories", "categories.id", "products.category_id")
      .orderBy("products.name");

    return products;
  }
  async findByNameIngredientsAndCategory({ search, category }) {
    const products = await knex("products")
      .select(
        "products.id",
        "products.name",
        "products.description",
        "products.price",
        "products.image",
        "products.category_id",
        "products.created_at",
        "products.updated_at"
      )
      .distinct("products.id")
      .where("categories.name", `${category}`)
      .andWhereLike("products.name", `%${search}%`)
      .orWhere("categories.name", `${category}`)
      .andWhereLike("ingredients.name", `%${search}%`)
      .innerJoin("ingredients", "products.id", "ingredients.product_id")
      .innerJoin("categories", "products.category_id", "categories.id")
      .orderBy("products.name");
    return products;
  }
  async findProductsByIdList(ids, columns) {
    const products = knex("products")
      .column(columns)
      .select()
      .whereIn("id", ids);
    return products;
  }
  async findById(id) {
    const product = await knex("products").where({ id }).first();
    return product;
  }
  async totalProductsWithOldCategory({ category_id, id }) {
    const [total] = await knex("products")
      .where({ category_id })
      .andWhereNot({ id })
      .count();
    return total["count(*)"];
  }
  async create({ name, description, image, price, category_id }) {
    const [product_id] = await knex("products").insert({
      name,
      description,
      image,
      price,
      category_id,
    });
    return product_id;
  }
  async update({ id, name, description, price, category_id }) {
    const [product_id] = await knex("products")
      .update(
        {
          name,
          description,
          price,
          category_id,
          updated_at: knex.fn.now(),
        },
        ["id"]
      )
      .where({ id });
    return product_id;
  }
  async delete(id) {
    await knex("products").where({ id }).delete();
    return id;
  }
  async show(id) {
    const product = await knex("products").where({ id }).first();
    return product;
  }
}
module.exports = ProductsRepository;
