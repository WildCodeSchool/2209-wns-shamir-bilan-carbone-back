import { Repository } from "typeorm";
import { Recipe } from "../models/Recipe";
import { dataSource } from "../tools/utils";

const recipeRepository: Repository<Recipe> = dataSource.getRepository(Recipe);

export default {
  /**
   * Returns list of recipes from DB
   * @returns array of Recipes
   */
  getAll: async (): Promise<Recipe[]> => {
    return await recipeRepository.find();
  },
};
