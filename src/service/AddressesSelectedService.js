const AppError = require("../utils/AppError");
class AddressesSelectedService {
  constructor(addressesSelectedRepository) {
    this.addressesSelectedRepository = addressesSelectedRepository;
  }
  async update({ id, user_id }) {
    const address = await this.addressesSelectedRepository.findById({
      id,
      user_id,
    });
    if (!address) {
      throw new AppError("Endereço não encontrado!", 404);
    }
    const checkSelectedAddress =
      await this.addressesSelectedRepository.findSelectedAddress(user_id);
    if (checkSelectedAddress && checkSelectedAddress.id != address.id) {
      await this.addressesSelectedRepository.updateSelectedToFalse(
        checkSelectedAddress.id
      );
    }
    const address_id =
      await this.addressesSelectedRepository.updateSelectedToTrue(address.id);
    return address_id;
  }
}
module.exports = AddressesSelectedService;
