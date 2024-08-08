const CategoriesRepository = require("../repository/CategoriesRepository");
const CategoriesService = require("../service/CategoriesService");
const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
class CategoriesController {
  async index(req, res) {
    const categories = await categoriesService.index();
    return res.status(200).json(categories);
  }
}
module.exports = CategoriesController;
