const knex = require("../database/knex");
class AddressesRepository {
  async createWithType({
    type,
    street,
    number,
    neighborhood,
    complement,
    city,
    state,
    zipCode,
    user_id,
  }) {
    const [address_id] = await knex("addresses").insert({
      type,
      street,
      number,
      neighborhood,
      complement,
      city,
      state,
      zipCode,
      user_id,
    });
    return address_id;
  }
  async createWithoutType({
    street,
    number,
    neighborhood,
    complement,
    city,
    state,
    zipCode,
    user_id,
  }) {
    const [address_id] = await knex("addresses").insert({
      street,
      number,
      neighborhood,
      complement,
      city,
      state,
      zipCode,
      user_id,
    });
    return address_id;
  }
  async findById({ id, user_id }) {
    const address = await knex("addresses").where({ id, user_id }).first();
    return address;
  }
  async findAddress({
    street,
    number,
    neighborhood,
    complement,
    city,
    state,
    zipCode,
    user_id,
  }) {
    const address = await knex("addresses")
      .where({
        street,
        number,
        neighborhood,
        complement: !complement ? null : complement,
        city,
        state,
        zipCode,
        user_id,
      })
      .first();
    return address;
  }
  async findHomeAddress(user_id) {
    const address = await knex("addresses")
      .where({ type: "home", user_id })
      .andWhereNot({ selected: true })
      .first();
    return address;
  }
  async findWorkAddress(user_id) {
    const address = await knex("addresses")
      .where({ type: "work", user_id })
      .andWhereNot({ selected: true })
      .first();
    return address;
  }
  async findGeneralAddressesByStreetAndNumber({ search, user_id }) {
    const addresses = await knex("addresses")
      .where({ user_id, type: "general" })
      .andWhereLike("street", `%${search.trim()}%`)
      .andWhereNot({ selected: 1 })
      .orWhere({ user_id, type: "general" })
      .andWhereLike("number", `%${search.trim()}%`)
      .andWhereNot({ selected: 1 })
      .orderBy("updated_at", "desc")
      .limit(5);
    return addresses;
  }
  async findSelectedAddress(user_id) {
    const address = await knex("addresses")
      .where({ selected: true, user_id })
      .first();
    return address;
  }
  async findByTypeAndUserId({ type, user_id }) {
    const address = await knex("addresses").where({ type, user_id }).first();
    return address;
  }
  async updateType({ id, type }) {
    const [address_id] = await knex("addresses")
      .update({ type }, ["id"])
      .where({ id });
    return address_id;
  }
  async updateSelected({ id, selected }) {
    const [address_id] = await knex("addresses")
      .update({ selected }, ["id"])
      .where({ id });
    return address_id;
  }
  async updateExistingAddressWithType({ id, type, selected }) {
    const [address_id] = await knex("addresses")
      .update({ type, selected, updated_at: knex.fn.now() }, ["id"])
      .where({ id });
    return address_id;
  }
  async updateExistingAddressWithoutType({ id, selected }) {
    const [address_id] = await knex("addresses")
      .update({ selected, updated_at: knex.fn.now() }, ["id"])
      .where({ id });
    return address_id;
  }
  async update({
    id,
    type,
    street,
    number,
    neighborhood,
    complement,
    city,
    state,
    zipCode,
  }) {
    const [address_id] = await knex("addresses")
      .update(
        {
          type,
          street,
          number,
          neighborhood,
          complement,
          city,
          state,
          zipCode,
          updated_at: knex.fn.now(),
        },
        ["id"]
      )
      .where({ id });
    return address_id;
  }
  async delete(id) {
    await knex("addresses").where({ id }).delete();
    return id;
  }
}
module.exports = AddressesRepository;
