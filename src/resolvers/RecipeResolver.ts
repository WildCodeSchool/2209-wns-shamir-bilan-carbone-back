import { Recipe } from "../models/Recipe";
import Agribalyse from "../models/Agribalyse";
import recipeService from "../services/recipeService";
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Ctx,
  Authorized,
  Int,
} from "type-graphql";
import { CreateRecipeInputType } from "../inputs/CreateRecipeInputType";
import agribalyseService from "services/agribalyseService";

@Resolver(Recipe)
export class RecipeResolver {
  // @Authorized("ADMIN")
  @Query(() => [Recipe]) // pass the return type on the first parameter.
  async getAllRecipes(): Promise<Recipe[]> {
    return await recipeService.getAll();
  }

  @Query(() => [Recipe])
  async recipes(): Promise<Recipe[]> {
    const recipes = await recipeService.getAll();
    return recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      calcul: recipe.calcul,
      agribalyses: recipe.agribalyses,
    }));
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("name", () => String) name: string,
    @Arg("agribalyseIds", () => [Int]) agribalyseIds: number[]
  ): Promise<Recipe> {
    return recipeService.create(name, agribalyseIds);
  }

  // Here, we’re creating a createRecipe method that
  // will return a Recipe type. In this method,
  // we initialize a new instance of Recipe, save
  // it to the database with the save method, and return it.
  // This method requires data as a parameter.
  // To obtain data from users, we can build
  // an input type to specify what fields are necessary for this mutation.
  //   @Authorized("ADMIN")
  // @Mutation(() => Recipe)
  // async createRecipe(@Arg("data") data: CreateRecipeInputType) {
  //   // const recipe = Recipe.create(data);
  //   return await recipeService.create(data);
  // }

  // @Mutation(() => Recipe)
  // async createRecipe(
  //   @Arg("data") data: CreateRecipeInputType
  // ): Promise<Recipe> {
  //   const agribalyse: Agribalyse = await agribalyseService.getById(
  //     data.agribalyseId
  //   );
  //   const recipeData = {
  //     name: data.name,
  //     description: data.description,
  //     calcul: data.calcul,
  //     agribalyse: agribalyse,
  //   };
  //   return await recipeService.create(recipeData);
  // }
}
