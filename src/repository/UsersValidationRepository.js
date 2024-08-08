const knex = require("../database/knex");
class UsersValidationRepository {
  async findById(id) {
    const role = await knex("users").select("role").where({ id }).first();
    return role;
  }
}
module.exports = UsersValidationRepository;
