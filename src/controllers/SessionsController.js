const UsersRepository = require("../repository/UsersRepository");
const SessionsService = require("../service/SessionsService");
class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const usersRepository = new UsersRepository();
    const sessionsService = new SessionsService(usersRepository);
    const { user, token } = await sessionsService.create({ email, password });
    res.cookie("token", token);
    return res.status(200).json(user);
  }
  async delete(req, res) {
    res.clearCookie("token");
    return res.status(204).json();
  }
}
module.exports = SessionsController;
