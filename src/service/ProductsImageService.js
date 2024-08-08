const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class ProductsImageService {
  constructor(productsImageRepository) {
    this.productsImageRepository = productsImageRepository;
    this.diskStorage = new DiskStorage();
  }
  async update({ id, imageFilename }) {
    const product = await this.productsImageRepository.findById(id);
    if (!product) {
      throw new AppError("Produto não encontrado!", 404);
    }
    if (product.image) {
      await this.diskStorage.deleteFile(product.image);
    }
    const filename = await this.diskStorage.saveFile(imageFilename);
    product.image = filename;
    const product_id = await this.productsImageRepository.update({
      id,
      image: product.image,
    });
    return product_id;
  }
}
module.exports = ProductsImageService;
