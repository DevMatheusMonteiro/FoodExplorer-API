const knex = require("../database/knex");
class UsersRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();
    return user;
  }
  async findById(id) {
    const user = await knex("users").where({ id }).first();
    return user;
  }
  async create({ name, email, password }) {
    const [userId] = await knex("users").insert({ name, email, password });
    return { id: userId };
  }
  async update({ id, name, email, password }) {
    const [userId] = await knex("users")
      .update(
        {
          name,
          email,
          password,
          updated_at: knex.fn.now(),
        },
        ["id"]
      )
      .where({ id });
    return userId;
  }
  async delete(id) {
    await knex("users").where({ id }).delete();
    return id;
  }
}
module.exports = UsersRepository;
