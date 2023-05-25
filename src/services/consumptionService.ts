import { Repository } from "typeorm";
import Consumption from "../models/Consumption";
import Recipe from "../models/Recipe";
import { User } from "../models/User";
import { dataSource } from "../tools/utils";

const consumptionRepository: Repository<Consumption> =
  dataSource.getRepository(Consumption);
const recipeRepository: Repository<Recipe> = dataSource.getRepository(Recipe);
const userRepository: Repository<User> = dataSource.getRepository(User);

// export default {
const consumptionService = {
  /**
   * Returns list of consumptions from DB
   * @returns array of Consumptions
   */
  getAll: async (): Promise<Consumption[]> => {
    return await consumptionRepository.find();
  },

  /**
   *
   */
  createConsRecipeUser: async (
    empreinte: string,
    description: string,
    createdAt: Date,
    recipeIds: number[],
    userId: number
  ): Promise<Consumption> => {
    const consumption = new Consumption();

    consumption.description = description;
    consumption.createdAt = new Date(Date.now());

    const recipes = [];
    for (let recipeId of recipeIds) {
      const recipe = await recipeRepository.findOneByOrFail({ id: recipeId });
      recipes.push(recipe);
    }
    const sumEmpreintOfRecipes = recipes.reduce(
      (total, recipe) => total + parseFloat(recipe.calcul || "0"),
      0
    );

    consumption.empreinte = sumEmpreintOfRecipes.toString();
    consumption.recipes = recipes;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User id: ${userId} not found`);
    }

    consumption.user = user;

    return consumptionRepository.save(consumption);
  },
};

export default consumptionService;
