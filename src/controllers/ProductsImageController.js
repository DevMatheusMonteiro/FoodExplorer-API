const ProductsImageRepository = require("../repository/ProductsImageRepository");
const ProductsImageService = require("../service/ProductsImageService");
const productsImageRepository = new ProductsImageRepository();
const productsImageService = new ProductsImageService(productsImageRepository);
class ProductsImageController {
  async create(req, res) {
    const imageFilename = req.file.filename;
    const image = await productsImageService.create(imageFilename);
    return res.status(200).json(image);
  }
  async update(req, res) {
    const { id } = req.params;
    const imageFilename = req.file.filename;
    const image = await productsImageService.update({
      id,
      imageFilename,
    });
    return res.status(200).json(image);
  }
}
module.exports = ProductsImageController;
