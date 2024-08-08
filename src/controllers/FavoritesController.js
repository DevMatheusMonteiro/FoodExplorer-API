const FavoritesRepository = require("../repository/FavoritesRepository");
const ProductsRepository = require("../repository/ProductsRepository");
const FavoritesService = require("../service/FavoritesService");
const favoritesRepository = new FavoritesRepository();
const productsRepository = new ProductsRepository();
const favoritesService = new FavoritesService(
  favoritesRepository,
  productsRepository
);
class FavoritesController {
  async create(req, res) {
    const { product_id } = req.body;
    const user_id = req.user.id;
    const favorite = await favoritesService.create({ product_id, user_id });
    return res.status(200).json(favorite);
  }
  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    await favoritesService.delete({ id, user_id });
    return res.status(204).json();
  }
  async index(req, res) {
    const user_id = req.user.id;
    const favorites = await favoritesService.index(user_id);
    return res.status(200).json(favorites);
  }
}

module.exports = FavoritesController;
