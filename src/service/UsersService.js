const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");
class UsersService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async create({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError("Email já cadastrado!");
    }
    const hashedPassword = await hash(password, 8);
    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return userCreated;
  }
  async update({ id, name, email, currentPassword, password }) {
    const user = await this.userRepository.findById(id);
    if (email) {
      const userUpdate = await this.userRepository.findByEmail(email);
      if (userUpdate && userUpdate.id !== user.id) {
        throw new AppError("Email já cadastrado!");
      }
    }
    if (password && !currentPassword) {
      throw new AppError("Informe a senha atual!");
    }
    if (password && currentPassword) {
      const checkPassword = await compare(currentPassword, user.password);
      if (!checkPassword) {
        throw new AppError("Senha atual incorreta!");
      }
      const hashedPassword = await hash(password, 8);
      user.password = hashedPassword;
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    const userUpdated = await this.userRepository.update({
      id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return userUpdated;
  }
  async delete(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }
    const userDeleted = await this.userRepository.delete(id);
    return userDeleted;
  }
}
module.exports = UsersService;
