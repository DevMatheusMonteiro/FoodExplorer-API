const AppError = require("../utils/AppError");
const IngredientsService = require("./IngredientsService");
const CategoriesService = require("./CategoriesService");
class ProductsService {
  categoriesService;
  ingredientsService;
  constructor(productsRepository, categoriesRepository, ingredientsRepository) {
    this.productsRepository = productsRepository;
    this.categoriesRepository = categoriesRepository;
    this.ingredientsRepository = ingredientsRepository;
    this.categoriesService = new CategoriesService(this.categoriesRepository);
    this.ingredientsService = new IngredientsService(
      this.ingredientsRepository
    );
  }
  async create({ name, description, price, category, ingredients }) {
    const checkProductExists = await this.productsRepository.findByName(name);
    if (checkProductExists) {
      throw new AppError("Este produto já está cadastrado!");
    }
    if (!category) {
      throw new AppError("É necessário informar a categoria do produto!");
    }
    if (!price) {
      throw new AppError("É necessário informar o preço do produto!");
    }
    if (ingredients.length <= 0) {
      throw new AppError("Coloque ao menos um ingrediente");
    }
    const category_id = await this.categoriesService.create(category);
    const product_id = await this.productsRepository.create({
      name,
      description,
      price,
      category_id,
    });
    const ingredients_id = await ingredientsService.create(
      ingredients,
      product_id
    );
    return { product_id, category_id, ingredients_id };
  }
  async update({ id, name, description, price, category, ingredients }) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }
    if (name) {
      const productUpdate = await this.productsRepository.findByName(name);
      if (productUpdate && productUpdate.id !== product.id) {
        throw new AppError("Produto já cadastrado!");
      }
    }
    let category_id;
    if (category) {
      category_id = await this.categoriesService.create(category);
      if (product.category_id != category_id) {
        const totalProductsWithOldCategory =
          await this.productsRepository.totalProductsWithOldCategory({
            category_id: product.category_id,
            id: product.id,
          });
        if (totalProductsWithOldCategory == 0) {
          await this.categoriesRepository.delete(product.category_id);
        }
      }
    }
    let newIngredients_id = [];
    let deletedIngredientsName = [];
    if (ingredients) {
      const foundByProductId = await this.ingredientsRepository.findByProductId(
        product.id
      );
      const nameOfDBIngredients = foundByProductId.map(
        (nameOfIngredient) => nameOfIngredient.name
      );
      const deletedIngredients = nameOfDBIngredients.filter(
        (ingredient) => !ingredients.includes(ingredient)
      );
      const newIngredients = ingredients.filter(
        (ingredient) => !nameOfDBIngredients.includes(ingredient)
      );
      const sameIngredients = ingredients.filter((ingredient) =>
        nameOfDBIngredients.includes(ingredient)
      );
      if (newIngredients.length == 0 && sameIngredients.length == 0) {
        throw new AppError("Coloque ao menos um ingrediente!");
      }
      if (newIngredients.length > 0) {
        newIngredients_id = await this.ingredientsService.create(
          newIngredients,
          product.id
        );
      }
      if (deletedIngredients.length > 0) {
        deletedIngredientsName = await this.ingredientsService.delete(
          deletedIngredients,
          product.id
        );
      }
    }
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category_id = category_id ?? product.category_id;
    const product_id = await this.productsRepository.update({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category_id,
    });
    return {
      ...product_id,
      category_id,
      newIngredients: newIngredients_id,
      deletedIngredients: deletedIngredientsName,
    };
  }
  async delete(id) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }
    const totalProductsWithOldCategory =
      await this.productsRepository.totalProductsWithOldCategory({
        category_id: product.category_id,
        id: product.id,
      });
    if (totalProductsWithOldCategory == 0) {
      await this.categoriesRepository.delete(product.category_id);
    }
    const deleted_product = await this.productsRepository.delete(id);
    return { id: deleted_product };
  }
  async index({ search, category }) {
    let products;
    if (category) {
      products = await this.productsRepository.findByNameIngredientsAndCategory(
        { search, category }
      );
    } else {
      products = await this.productsRepository.findByNameAndIngredients(search);
    }
    const categories = await this.categoriesRepository.all();
    const productsByCategory = categories.map((category) => {
      const productsOfTheCategory = products.filter(
        (product) => product.category_id === category.id
      );
      return {
        ...category,
        products: productsOfTheCategory,
      };
    });
    const categoriesWithProducts = productsByCategory.filter(
      (productByCategory) => productByCategory.products.length > 0
    );

    return categoriesWithProducts;
  }
  async show(id) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }
    const ingredients = await this.ingredientsRepository.findByProductId(
      product.id
    );
    return {
      ...product,
      ingredients,
    };
  }
}
module.exports = ProductsService;
