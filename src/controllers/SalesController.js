const FeedbacksRepository = require("../repository/FeedbacksRepository");
const AddressesRepository = require("../repository/AddressesRepository");
const SalesRepository = require("../repository/SalesRepository");
const SalesService = require("../service/SalesService");
const salesRepository = new SalesRepository();
const feedbacksRepository = new FeedbacksRepository();
const addressesRepository = new AddressesRepository();
const salesService = new SalesService(
  salesRepository,
  addressesRepository,
  feedbacksRepository
);
class SalesController {
  async index(req, res) {
    const { status, page } = req.query;

    const orders = await salesService.index({ status, page });
    return res.status(200).json(orders);
  }
  async show(req, res) {
    const { id } = req.params;

    const order = await salesService.show(id);

    return res.status(200).json(order);
  }
}
module.exports = SalesController;
