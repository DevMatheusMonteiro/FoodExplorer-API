const knex = require("../database/knex");
class AddressesSelectedRepository {
  async findById({ id, user_id }) {
    const address = await knex("addresses").where({ id, user_id }).first();
    return address;
  }
  async findSelectedAddress(user_id) {
    const address = await knex("addresses")
      .where({ user_id, selected: true })
      .first();
    return address;
  }
  async updateSelectedToFalse(id) {
    const [address_id] = await knex("addresses")
      .update(
        {
          selected: false,
          updated_at: knex.fn.now(),
        },
        ["id"]
      )
      .where({ id });
    return address_id;
  }
  async updateSelectedToTrue(id) {
    const [address_id] = await knex("addresses")
      .update(
        {
          selected: true,
          updated_at: knex.fn.now(),
        },
        ["id"]
      )
      .where({ id });
    return address_id;
  }
}
module.exports = AddressesSelectedRepository;
