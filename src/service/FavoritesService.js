const AppError = require("../utils/AppError");
class FavoritesService {
  constructor(favoritesRepository, productsRepository) {
    this.favoritesRepository = favoritesRepository;
    this.productsRepository = productsRepository;
  }
  async create({ product_id, user_id }) {
    const favorite = await this.favoritesRepository.findByProductIdAndUserId({
      product_id,
      user_id,
    });
    if (favorite) {
      throw new AppError("Este produto já está favoritado!");
    }
    const product = await this.productsRepository.findById(product_id);
    if (!product) {
      throw new AppError("Produto não encontrado!", 404);
    }
    const favorite_id = await this.favoritesRepository.create({
      product_id,
      user_id,
    });
    return { id: favorite_id, product };
  }
  async delete({ id, user_id }) {
    const favorite = await this.favoritesRepository.findById({ id, user_id });
    if (!favorite) {
      throw new AppError("Favorito não encontrado!", 404);
    }
    const favorite_id = await this.favoritesRepository.delete(favorite.id);
    return { id: favorite_id };
  }
  async index(user_id) {
    const favorites = await this.favoritesRepository.findByUserId(user_id);
    const productIds = favorites.map((favorite) => favorite.product_id);
    const products = await this.productsRepository.findProductsByIdList(
      productIds,
      ["*"]
    );
    const favoritesWithProducts = favorites.map((favorite) => {
      const favoriteProduct = products.find(
        (product) => product.id == favorite.product_id
      );
      return { ...favorite, product: favoriteProduct };
    });
    return favoritesWithProducts;
  }
}
module.exports = FavoritesService;
