import { Recipe } from "../models/Recipe";
import recipeService from "../services/recipeService";
import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import { CreateRecipeInputType } from "../inputs/CreateRecipeInputType";

@Resolver(Recipe)
export class RecipeResolver {
  // @Authorized("ADMIN")
  @Query(() => [Recipe]) // pass the return type on the first parameter.
  async getAllRecipes(): Promise<Recipe[]> {
    return await recipeService.getAll();
  }

  // Here, we’re creating a createRecipe method that
  // will return a Recipe type. In this method,
  // we initialize a new instance of Recipe, save
  // it to the database with the save method, and return it.
  // This method requires data as a parameter.
  // To obtain data from users, we can build
  // an input type to specify what fields are necessary for this mutation.
  //   @Authorized("ADMIN")
  @Mutation(() => Recipe)
  async createRecipe(@Arg("data") data: CreateRecipeInputType) {
    // const recipe = Recipe.create(data);
    return await recipeService.create(data);
  }
}
