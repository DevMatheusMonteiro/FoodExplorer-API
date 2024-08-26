const CategoriesRepository = require("../repository/CategoriesRepository");
const IngredientsRepository = require("../repository/IngredientsRepository");
const ProductsRepository = require("../repository/ProductsRepository");
const ProductsService = require("../service/ProductsService");
const productsRepository = new ProductsRepository();
const categoriesRepository = new CategoriesRepository();
const ingredientsRepository = new IngredientsRepository();
const productsService = new ProductsService(
  productsRepository,
  categoriesRepository,
  ingredientsRepository
);
class ProductsController {
  async create(req, res) {
    const { name, description, image, price, category, ingredients } = req.body;
    await productsService.create({
      name,
      description,
      image,
      price,
      category,
      ingredients,
    });
    return res.status(201).json();
  }
  async update(req, res) {
    const { name, description, price, category, ingredients } = req.body;
    const { id } = req.params;
    await productsService.update({
      id,
      name,
      description,
      price,
      category,
      ingredients,
    });
    return res.status(200).json();
  }
  async delete(req, res) {
    const { id } = req.params;
    await productsService.delete(id);
    return res.status(204).json();
  }
  async index(req, res) {
    const { search, category } = req.query;
    const products = await productsService.index({ search, category });
    return res.status(200).json(products);
  }
  async show(req, res) {
    const { id } = req.params;
    const product = await productsService.show(id);
    return res.status(200).json(product);
  }
}

module.exports = ProductsController;
