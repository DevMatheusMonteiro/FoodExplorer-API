const knex = require("../database/knex");
class CardsRepository {
  async findById({ id, user_id }) {
    const card = await knex("cards").where({ id, user_id }).first();
    return card;
  }
  async findByNickname({ nickname, user_id }) {
    const card = await knex("cards").where({ nickname, user_id }).first();
    return card;
  }
  async findByNumber({ number, user_id }) {
    const card = await knex("cards")
      .whereLike("number", `%${number}%`)
      .andWhere({ user_id })
      .first();
    return card;
  }
  async findByNicknameAndType({ user_id, nickname, type }) {
    const cards = await knex("cards")
      .whereLike("nickname", `%${nickname}%`)
      .andWhere({ type })
      .andWhere({ user_id });
    return cards;
  }
  async create({
    nickname,
    type,
    number,
    expirationDate,
    holderName,
    securityCode,
    cpf,
    user_id,
  }) {
    const [card_id] = await knex("cards").insert({
      nickname,
      type,
      number,
      expirationDate,
      holderName,
      securityCode,
      cpf,
      user_id,
    });
    return card_id;
  }
  async update({ id, nickname }) {
    const [card_id] = await knex("cards")
      .update({ nickname }, ["id"])
      .where({ id });
    return card_id;
  }
  async delete(id) {
    await knex("cards").where({ id }).delete();
    return id;
  }
}
module.exports = CardsRepository;
