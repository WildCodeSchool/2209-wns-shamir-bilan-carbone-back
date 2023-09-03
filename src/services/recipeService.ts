import { Repository } from "typeorm";
import { Recipe } from "../models/Recipe";
import Agribalyse from "../models/Agribalyse";
import Consumption from "models/Consumption";
import { dataSource } from "../tools/utils";
import { RecipeIdsInput } from "inputs/RecipeIdsInput";

const recipeRepository: Repository<Recipe> = dataSource.getRepository(Recipe);
const agribalyseRepository: Repository<Agribalyse> =
  dataSource.getRepository(Agribalyse);

// export default {
const recipeService = {
  /**
   * Returns list of recipes from DB
   * @returns array of Recipes
   */
  getAll: async (): Promise<Recipe[]> => {
    // return await recipeRepository.find();
    const recipes = await recipeRepository.find();
    const sortedRecipes = recipes.sort((a, b) => (b?.id || 0) - (a?.id || 0));
    return sortedRecipes;
  },

  getById: async (id: number): Promise<Recipe | null> => {
    return await recipeRepository.findOne({ where: { id: id } });
  },

  //new

  getByIds: async (recipeIds: RecipeIdsInput) => {
    const selectedRecipeIds: Recipe[] = await recipeRepository
      .createQueryBuilder()
      .select("recipe")
      .from(Recipe, "recipe")
      .where("recipe.id IN (:...ids)", { ids: recipeIds.ids })
      .getMany();
    if (!selectedRecipeIds) {
      console.log("No recipes found for the provided IDs.");
    } else {
      console.log("Service-selectedRecipeIds:", selectedRecipeIds);
    }

    return selectedRecipeIds;
  },

  //end new

  getByName: async (name: string) => {
    return await recipeRepository.findOneBy({
      name,
    });
  },

  /**
   * Create a new recipe in the database
   * @param
   * @returns recipe object
   */
  create: async (
    name: string,
    description: string,
    calcul: string,
    agribalyseIds: number[]
  ): Promise<Recipe> => {
    const recipe = new Recipe();
    recipe.name = name;
    recipe.description = description;
    recipe.calcul = calcul;
    const agribalyses = [];
    for (let agribalyseId of agribalyseIds) {
      const agribalyse = await agribalyseRepository.findOneByOrFail({
        id: agribalyseId,
      });

      agribalyses.push(agribalyse);
    }

    recipe.agribalyses = agribalyses;

    return recipeRepository.save(recipe);
  },
};

export default recipeService;
