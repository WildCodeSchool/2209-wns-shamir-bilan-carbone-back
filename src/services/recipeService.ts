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

  /**
   * Create a new recipe in the database
   * @param name recipe name
   * @param description recipe description
   * @param calcul recipe calcul
   * @returns
   */
  create: async (
    name: string,
    description: string,
    calcul: string
  ): Promise<Recipe> => {
    const newRecipe = new Recipe();
    newRecipe.name = name;
    newRecipe.description = description;
    newRecipe.calcul = calcul;
    return await recipeRepository.save(newRecipe);
  },
};
