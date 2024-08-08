const UsersValidationRepository = require("../repository/UsersValidationRepository");
const UsersValidationService = require("../service/UsersValidationService");
const usersValidationRepository = new UsersValidationRepository();
const usersValidationService = new UsersValidationService(
  usersValidationRepository
);
class UserValidationController {
  async show(req, res) {
    const { id } = req.user;
    const role = await usersValidationService.show(id);
    return res.status(200).json(role);
  }
}
module.exports = UserValidationController;
