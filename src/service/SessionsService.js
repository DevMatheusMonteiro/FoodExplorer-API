const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const { jwt } = require("../configs/auth");
const { sign } = require("jsonwebtoken");
class SessionsService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async create({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email e/ou senha incorretos", 401);
    }
    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw new AppError("Email e/ou senha incorretos", 401);
    }
    const { secret, expiresIn } = jwt;
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });
    delete user.id;
    delete user.password;
    delete user.role;
    return { user, token };
  }
}
module.exports = SessionsService;
