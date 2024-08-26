const OrdersRepository = require("../repository/OrdersRepository");
const OrdersService = require("../service/OrdersService");
const AddressesSelectedRepository = require("../repository/AddressesSelectedRepository");
const SalesRepository = require("../repository/SalesRepository");
const ProductsRepository = require("../repository/ProductsRepository");
const FeedbacksRepository = require("../repository/FeedbacksRepository");
const AddressesRepository = require("../repository/AddressesRepository");
const ordersRepository = new OrdersRepository();
const salesRepository = new SalesRepository();
const productsRepository = new ProductsRepository();
const addressSelectedRepository = new AddressesSelectedRepository();
const feedbacksRepository = new FeedbacksRepository();
const addressesRepository = new AddressesRepository();
const ordersService = new OrdersService(
  ordersRepository,
  addressSelectedRepository,
  addressesRepository,
  productsRepository,
  salesRepository,
  feedbacksRepository
);
class OrdersController {
  async create(req, res) {
    const { paymentMethod, address_id, orders } = req.body;
    const user_id = req.user.id;
    await ordersService.create({
      paymentMethod,
      address_id,
      orders,
      user_id,
    });
    return res.status(201).json();
  }
  async index(req, res) {
    const { status, page } = req.query;
    const user_id = req.user.id;
    const orders = await ordersService.index({ status, user_id, page });
    return res.status(200).json(orders);
  }
  async show(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    const order = await ordersService.show({ id, user_id });
    return res.status(200).json(order);
  }
}

module.exports = OrdersController;
