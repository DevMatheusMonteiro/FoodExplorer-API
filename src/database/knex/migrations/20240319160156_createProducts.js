exports.up = (knex) =>
  knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("description");
    table.decimal("price", 8, 2).notNullable();
    table.text("image");

    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .onDelete("SET NULL");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("products");
