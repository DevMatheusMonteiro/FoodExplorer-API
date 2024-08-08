const AppError = require("../utils/AppError");
class AddressesService {
  constructor(addressesRepository) {
    this.addressesRepository = addressesRepository;
  }
  async create({
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
    if (!street || !number || !neighborhood || !city || !state || !zipCode) {
      throw new AppError("Endereço incompleto!");
    }
    const checkAddressExists = await this.addressesRepository.findAddress({
      street,
      number,
      neighborhood,
      complement:
        complement == null || complement.trim() == "" ? null : complement,
      city,
      state,
      zipCode,
      user_id,
    });
    const selectedAddress = await this.addressesRepository.findSelectedAddress(
      user_id
    );
    let address_id;
    if (checkAddressExists) {
      if (selectedAddress && selectedAddress.id != checkAddressExists.id) {
        await this.addressesRepository.updateSelected({
          id: selectedAddress.id,
          selected: false,
        });
      }
      if (type) {
        if (type != "general") {
          const foundByType =
            await this.addressesRepository.findByTypeAndUserId({
              type,
              user_id,
            });

          if (foundByType && foundByType.id != checkAddressExists.id) {
            await this.addressesRepository.updateType({
              id: foundByType.id,
              type: "general",
            });
          }
        }
        address_id =
          await this.addressesRepository.updateExistingAddressWithType({
            id: checkAddressExists.id,
            type,
            selected: true,
          });
      } else {
        address_id =
          await this.addressesRepository.updateExistingAddressWithoutType({
            id: checkAddressExists.id,
            selected: true,
          });
      }
      return address_id;
    }
    if (selectedAddress) {
      await this.addressesRepository.updateSelected({
        id: selectedAddress.id,
        selected: false,
      });
    }
    if (type) {
      if (type != "general") {
        const foundByType = await this.addressesRepository.findByTypeAndUserId({
          type,
          user_id,
        });
        if (foundByType) {
          await this.addressesRepository.updateType({
            id: foundByType.id,
            type: "general",
          });
        }
      }
      address_id = await this.addressesRepository.createWithType({
        type,
        street,
        number,
        neighborhood,
        complement:
          complement == null || complement.trim() == "" ? null : complement,
        city,
        state,
        zipCode,
        user_id,
      });
    } else {
      address_id = await this.addressesRepository.createWithoutType({
        street,
        number,
        neighborhood,
        complement:
          complement == null || complement.trim() == "" ? null : complement,
        city,
        state,
        zipCode,
        user_id,
      });
    }
    return { id: address_id };
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
    user_id,
  }) {
    const address = await this.addressesRepository.findById({ id, user_id });
    if (!address) {
      throw new AppError("Endereço não encontrado!", 404);
    }
    const checkAddressExists = await this.addressesRepository.findAddress({
      street,
      number,
      neighborhood,
      complement:
        complement == null || complement.trim() == "" ? null : complement,
      city,
      state,
      zipCode,
      user_id,
    });
    if (checkAddressExists && checkAddressExists.id !== address.id) {
      if (checkAddressExists.selected === 1) {
        throw new AppError("Esse endereço já existe e está selecionado!");
      }
      await this.addressesRepository.delete(checkAddressExists.id);
    }
    if (type && type != "general") {
      const foundByType = await this.addressesRepository.findByTypeAndUserId({
        type,
        user_id,
      });
      if (foundByType) {
        await this.addressesRepository.updateType({
          id: foundByType.id,
          type: "general",
        });
      }
    }
    address.type = type ?? address.type;
    address.street = street ?? address.street;
    address.number = number ?? address.number;
    address.neighborhood = neighborhood ?? address.neighborhood;
    address.complement =
      complement == null || complement.trim() == "" ? null : complement;
    address.city = city ?? address.city;
    address.state = state ?? address.state;
    address.zipCode = zipCode ?? address.zipCode;
    const address_id = await this.addressesRepository.update({
      id: address.id,
      type: address.type,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    });
    return address_id;
  }
  async delete({ id, user_id }) {
    const address = await this.addressesRepository.findById({ id, user_id });
    if (!address) {
      throw new AppError("Endereço não encontrado!", 404);
    }
    if (address.selected === 1) {
      throw new AppError(
        "O endereço não pode ser deletado se estiver selecionado!"
      );
    }
    const address_id = await this.addressesRepository.delete(id);
    return { id: address_id };
  }
  async index({ search, user_id }) {
    const selectedAddress = await this.addressesRepository.findSelectedAddress(
      user_id
    );
    const homeAddress = await this.addressesRepository.findHomeAddress(user_id);
    const wordAddress = await this.addressesRepository.findWorkAddress(user_id);
    const generalAddresses =
      await this.addressesRepository.findGeneralAddressesByStreetAndNumber({
        search,
        user_id,
      });
    let addresses = [
      selectedAddress,
      homeAddress,
      wordAddress,
      ...generalAddresses,
    ];
    if (addresses.every((address) => address == null)) {
      addresses = [];
    }
    return addresses;
  }
  async show({ id, user_id }) {
    const address = await this.addressesRepository.findById({ id, user_id });
    if (!address) {
      throw new AppError("Endereço não encontrado", 404);
    }
    return address;
  }
}
module.exports = AddressesService;
