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
import { RecipeIdsInput } from "../inputs/RecipeIdsInput";

@Resolver(Recipe)
export class RecipeResolver {
  @Authorized("ADMIN")
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

  @Query(() => Recipe, { nullable: true })
  async getRecipeById(
    @Arg("recipeId") recipeId: number
  ): Promise<Recipe | null> {
    return recipeService.getById(recipeId);
  }

  //new
  @Query(() => [Recipe])
  async getRecipesByIds(
    @Arg("input") recipeIds: RecipeIdsInput
  ): Promise<Recipe[]> {
    return recipeService.getByIds(recipeIds);
  }
  //end new

  @Authorized("ADMIN")
  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("name", () => String) name: string,
    @Arg("description", () => String) description: string,
    @Arg("empreinte", () => String) empreinte: string,
    @Arg("agribalyseIds", () => [Int]) agribalyseIds: number[]
  ): Promise<Recipe> {
    console.log(agribalyseIds);
    console.log(name);
    return recipeService.create(name, description, empreinte, agribalyseIds);
  }
}
