import { gql, ApolloServer } from "apollo-server";
import { Recipe } from "../models/Recipe";
import recipeService from "../services/recipeService";
import createServer from "../tools/server";
import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";

@Resolver(Recipe)
export class RecipeResolver {
  // @Authorized("ADMIN")
  @Query(() => [Recipe])
  async getAllRecipes(): Promise<Recipe[]> {
    return await recipeService.getAll();
  }
}
