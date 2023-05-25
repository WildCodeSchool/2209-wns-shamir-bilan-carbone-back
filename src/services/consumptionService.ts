import { Repository } from "typeorm";
import Consumption from "../models/Consumption";
import Recipe from "../models/Recipe";
import { dataSource } from "../tools/utils";

const consumptionRepository: Repository<Consumption> =
  dataSource.getRepository(Consumption);
const recipeRepository: Repository<Recipe> = dataSource.getRepository(Recipe);

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
  createConsRecipe: async (
    empreinte: string,
    description: string,
    createdAt: Date,
    recipeIds: number[]
  ): Promise<Consumption> => {
    const consumption = new Consumption();
    consumption.empreinte = empreinte;
    consumption.description = description;
    consumption.createdAt = new Date(Date.now());

    const recipes = [];
    for (let recipeId of recipeIds) {
      const recipe = await recipeRepository.findOneByOrFail({ id: recipeId });
      recipes.push(recipe);
    }

    consumption.recipes = recipes;

    return consumptionRepository.save(consumption);
  },
};

export default consumptionService;
