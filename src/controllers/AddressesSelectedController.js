const AddressesSelectedService = require("../service/AddressesSelectedService");
const AddressesSelectedRepository = require("../repository/AddressesSelectedRepository");
const addressesSelectedRepository = new AddressesSelectedRepository();
const addressesSelectedService = new AddressesSelectedService(
  addressesSelectedRepository
);
class AddressesSelectedController {
  async update(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    const address = await addressesSelectedService.update({ id, user_id });
    return res.status(200).json(address);
  }
}
module.exports = AddressesSelectedController;
