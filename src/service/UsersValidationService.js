class UsersValidationService {
  constructor(usersValidationRepository) {
    this.usersValidationRepository = usersValidationRepository;
  }
  async show(id) {
    const role = await this.usersValidationRepository.findById(id);
    if (!role) {
      throw new AppError("Unauthorized", 401);
    }
    return role;
  }
}
module.exports = UsersValidationService;
