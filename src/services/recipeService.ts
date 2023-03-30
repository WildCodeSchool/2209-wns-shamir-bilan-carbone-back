import { Repository } from "typeorm";
import { Recipe } from "../models/Recipe";
import { dataSource } from "../tools/utils";

const recipeRepository: Repository<Recipe> = dataSource.getRepository(Recipe);

// export default {
const recipeService = {
  /**
   * Returns list of recipes from DB
   * @returns array of Recipes
   */
  getAll: async (): Promise<Recipe[]> => {
    return await recipeRepository.find();
  },

  // getByName: async (name: string) => {
  //   return await recipeRepository.findOneBy({
  //     name,
  //   });
  // },

  /**
   * Create a new recipe in the database
   * @param recipeData recipeData such as name, description, calcul, Agrybalyse obj
   * @returns recipe object
   */
  create: async (recipeData: Recipe): Promise<Recipe> => {
    const recipe = await recipeRepository.save(recipeData);
    return recipe;
  },
};

export default recipeService;
