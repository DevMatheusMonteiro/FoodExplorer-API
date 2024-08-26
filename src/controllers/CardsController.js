const CardsRepository = require("../repository/CardsRepository");
const CardsService = require("../service/CardsService");
const cardsRepository = new CardsRepository();
const cardsService = new CardsService(cardsRepository);
class CardsController {
  async create(req, res) {
    const {
      nickname,
      type,
      number,
      expirationDate,
      holderName,
      securityCode,
      cpf,
    } = req.body;
    const user_id = req.user.id;
    const card = await cardsService.create({
      nickname,
      type,
      number,
      expirationDate,
      holderName,
      securityCode,
      cpf,
      user_id,
    });
    return res.status(201).json(card);
  }
  async update(req, res) {
    const { nickname } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;
    await cardsService.update({ id, user_id, nickname });
    return res.status(200).json();
  }
  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    await cardsService.delete({ id, user_id });
    return res.status(204).json();
  }
  async index(req, res) {
    const { nickname, type } = req.query;
    const user_id = req.user.id;
    const cards = await cardsService.index({ user_id, nickname, type });
    return res.status(200).json(cards);
  }
  async show(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    const card = await cardsService.show({ id, user_id });
    return res.status(200).json(card);
  }
}

module.exports = CardsController;
