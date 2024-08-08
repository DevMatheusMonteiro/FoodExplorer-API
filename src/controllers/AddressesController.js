const AddressesRepository = require("../repository/AddressesRepository");
const AddressesService = require("../service/AddressesService");
const addressesRepository = new AddressesRepository();
const addressesService = new AddressesService(addressesRepository);
class AddressesController {
  async create(req, res) {
    const {
      type,
      street,
      number,
      neighborhood,
      complement,
      city,
      state,
      zipCode,
    } = req.body;
    const user_id = req.user.id;
    await addressesService.create({
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
    return res.status(201).json();
  }
  async update(req, res) {
    const {
      type,
      street,
      number,
      neighborhood,
      complement,
      city,
      state,
      zipCode,
    } = req.body;
    const user_id = req.user.id;
    const { id } = req.params;
    await addressesService.update({
      id,
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
    return res.status(200).json();
  }
  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    await addressesService.delete({ id, user_id });
    return res.status(204).json();
  }
  async index(req, res) {
    const { search } = req.query;
    const user_id = req.user.id;

    const addresses = await addressesService.index({ search, user_id });
    return res.status(200).json(addresses);
  }
  async show(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    const address = await addressesService.show({ id, user_id });
    return res.status(200).json(address);
  }
}

module.exports = AddressesController;
