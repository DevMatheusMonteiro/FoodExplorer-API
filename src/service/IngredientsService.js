class IngredientsService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }
  async create(ingredients, product_id) {
    const ingredients_id = [];
    for (const ingredient of ingredients) {
      const ingredient_id = await this.ingredientsRepository.create({
        name: ingredient,
        product_id,
      });
      ingredients_id.push(ingredient_id);
    }
    return ingredients_id;
  }
  async delete(ingredients, product_id) {
    const deletedIngredients = [];
    for (const ingredient of ingredients) {
      const deletedIngredient =
        await this.ingredientsRepository.deleteByNameAndProductId({
          name: ingredient,
          product_id,
        });
      deletedIngredients.push(deletedIngredient);
    }
    return deletedIngredients;
  }
}
module.exports = IngredientsService;
