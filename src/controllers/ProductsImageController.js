const ProductsImageRepository = require("../repository/ProductsImageRepository");
const ProductsImageService = require("../service/ProductsImageService");
const productsImageRepository = new ProductsImageRepository();
const productsImageService = new ProductsImageService(productsImageRepository);
class ProductsImageController {
  async update(req, res) {
    const { id } = req.params;
    const imageFilename = req.file.filename;
    await productsImageService.update({
      id,
      imageFilename,
    });
    return res.status(200).json();
  }
}
module.exports = ProductsImageController;
