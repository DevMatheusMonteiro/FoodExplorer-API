const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
class CardsService {
  constructor(cardsRepository) {
    this.cardsRepository = cardsRepository;
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
    const foundByNickname = await this.cardsRepository.findByNickname({
      nickname,
      user_id,
    });
    if (foundByNickname) {
      throw new AppError("Já existe um cartão com esse apelido!");
    }
    const lastFourCharactersOfTheNumber = number.substring(
      number.length,
      number.length - 4
    );
    const beforeTheLastFourNumbers = number.substring(0, number.length - 4);
    const foundByNumber = await this.cardsRepository.findByNumber(
      lastFourCharactersOfTheNumber
    );
    if (foundByNumber) {
      throw new AppError("Esse cartão já foi cadastrado!");
    }
    const hashedBeforeTheLastForNumbers = await hash(
      beforeTheLastFourNumbers,
      8
    );
    const fullCardNumber =
      hashedBeforeTheLastForNumbers + lastFourCharactersOfTheNumber;
    const hashedSecurityCode = await hash(securityCode, 8);
    const [month, year] = expirationDate.split("/");
    const date = new Date(year, Number(month) - 1)
      .toISOString()
      .replace("T", " ")
      .replace(".000Z", "");
    const card_id = await this.cardsRepository.create({
      nickname,
      type,
      number: fullCardNumber,
      expirationDate: date,
      holderName,
      securityCode: hashedSecurityCode,
      cpf,
      user_id,
    });
    return { id: card_id };
  }
  async update({ id, user_id, nickname }) {
    const card = await this.cardsRepository.findById({ id, user_id });
    if (!card) {
      throw new AppError("Cartão não encontrado!", 404);
    }
    const foundByNickname = await this.cardsRepository.findByNickname({
      nickname,
      user_id,
    });
    if (foundByNickname && foundByNickname.id != card.id) {
      throw new AppError("Já existe um cartão com esse apelido!");
    }
    card.nickname = nickname ?? card.nickname;
    const card_id = await this.cardsRepository.update({
      id: card.id,
      nickname: card.nickname,
    });
    return card_id;
  }
  async delete({ id, user_id }) {
    const card = await this.cardsRepository.findById({ id, user_id });
    if (!card) {
      throw new AppError("Cartão não encontrado!", 404);
    }
    const card_id = await this.cardsRepository.delete(card.id);
    return { id: card_id };
  }
  async index({ user_id, nickname, type }) {
    const cards = await this.cardsRepository.findByNicknameAndType({
      user_id,
      nickname,
      type,
    });
    return cards;
  }
  async show({ user_id, id }) {
    const card = await this.cardsRepository.findById({ id, user_id });
    if (!card) {
      throw new AppError("Cartão não encontrado!", 404);
    }
    return card;
  }
}
module.exports = CardsService;
