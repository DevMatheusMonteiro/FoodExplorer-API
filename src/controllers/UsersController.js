const UsersRepository = require("../repository/UsersRepository");
const UsersService = require("../service/UsersService");
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    await usersService.create({ name, email, password });
    return res.status(201).json();
  }
  async update(req, res) {
    const { name, email, currentPassword, password } = req.body;
    const { id } = req.user;
    await usersService.update({
      id,
      name,
      email,
      currentPassword,
      password,
    });
    return res.status(200).json();
  }
  async delete(req, res) {
    const { id } = req.user;
    usersService.delete(id);
    res.clearCookie("token");
    return res.status(204).json();
  }
}
module.exports = UsersController;
