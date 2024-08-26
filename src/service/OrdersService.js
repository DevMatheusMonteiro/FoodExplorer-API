const AppError = require("../utils/AppError");
const AddressesSelectedService = require("../service/AddressesSelectedService");
class OrdersService {
  addressesSelectedService;
  constructor(
    ordersRepository,
    addressesSelectedRepository,
    addressesRepository,
    productsRepository,
    salesRepository,
    feedbacksRepository
  ) {
    this.ordersRepository = ordersRepository;
    this.addressesSelectedRepository = addressesSelectedRepository;
    this.productsRepository = productsRepository;
    this.salesRepository = salesRepository;
    this.feedbacksRepository = feedbacksRepository;
    this.addressesRepository = addressesRepository;
    this.addressesSelectedService = new AddressesSelectedService(
      addressesSelectedRepository
    );
  }
  async create({ paymentMethod, address_id, orders, user_id }) {
    if (orders.length == 0) {
      throw new AppError("Nenhum pedido enviado!");
    }
    const address = await this.addressesSelectedService.update({
      id: address_id,
      user_id,
    });
    const quantities = {};
    const product_ids = [];
    orders.forEach((order) => {
      product_ids.push(order.product_id);
      quantities[order.product_id] = order.quantity;
    });
    const products = await this.productsRepository.findProductsByIdList(
      product_ids,
      ["id", "price"]
    );
    product_ids.forEach((product_id) => {
      if (!products.some((product) => product.id === product_id)) {
        throw new AppError("Alguns produtos não foram encontrados", 404);
      }
    });
    const amount = products.reduce((amount, product) => {
      return product.price * quantities[product.id] + amount;
    }, 0);
    const order_id = await this.ordersRepository.create({
      paymentMethod,
      amount,
      user_id,
      address_id,
    });
    const sales = [];
    for (const order of orders) {
      const sale = await this.salesRepository.create({
        quantity: order.quantity,
        product_id: order.product_id,
        order_id,
      });
      sales.push(sale);
    }
    return { id: order_id, address_id: address.id, products, sales };
  }
  async index({ status, user_id, page }) {
    let orders;
    let total;
    if (status) {
      orders = await this.ordersRepository.findOrdersWithStatus({
        status,
        user_id,
        page: page * 5,
      });
      total = await this.ordersRepository.totalOrdersWithStatus({
        status,
        user_id,
      });
    } else {
      orders = await this.ordersRepository.findOrdersWithoutStatus({
        user_id,
        page: page * 5,
      });
      total = await this.ordersRepository.totalOrdersWithoutStatus(user_id);
    }
    const order_ids = orders.map((order) => order.id);
    const feedbacks = await this.feedbacksRepository.findByOrderIdList(
      order_ids
    );
    const sales = await this.salesRepository.findByOrderIdList(order_ids);
    const ordersWithSalesAndFeedbacks = orders.map((order) => {
      const orderFeedbacks = feedbacks.find(
        (feedback) => feedback.order_id == order.id
      );
      const orderSales = sales.filter((sale) => sale.order_id == order.id);
      return {
        ...order,
        rating: orderFeedbacks?.rating,
        comment: orderFeedbacks?.comment,
        products: orderSales,
      };
    });
    return { orders: ordersWithSalesAndFeedbacks, total };
  }
  async show({ id, user_id }) {
    const order = await this.ordersRepository.findById({ id, user_id });
    if (!order) {
      throw new AppError("Pedido não encontrado!", 404);
    }
    const [feedback] = await this.feedbacksRepository.findByOrderIdList([
      order.id,
    ]);
    const address = await this.addressesRepository.findById({
      id: order.address_id,
      user_id,
    });
    const sales = await this.salesRepository.findByOrderIdList([order.id]);
    return {
      ...order,
      address,
      rating: feedback?.rating,
      comment: feedback?.comment,
      products: sales,
    };
  }
}
module.exports = OrdersService;
