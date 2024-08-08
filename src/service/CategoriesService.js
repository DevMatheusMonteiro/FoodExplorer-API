class CategoriesService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  async create(name) {
    const checkCategoryExists = await this.categoriesRepository.findByName(
      name
    );
    let category_id;
    if (!checkCategoryExists) {
      category_id = await this.categoriesRepository.create(name);
    } else {
      category_id = checkCategoryExists.id;
    }
    return category_id;
  }
  async index() {
    const categories = this.categoriesRepository.all();
    return categories;
  }
}
module.exports = CategoriesService;
