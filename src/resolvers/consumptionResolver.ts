import { Consumption } from "../models/Consumption";
import consumptionService from "../services/consumptionService";
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Ctx,
  Authorized,
  Int,
} from "type-graphql";

@Resolver(Consumption)
export class ConsumptionResolver {
  @Query(() => [Consumption])
  async getAllConsumptions(): Promise<Consumption[]> {
    return await consumptionService.getAll();
  }

  @Mutation(() => Consumption)
  async createConsumptionWithRecipe(
    @Arg("empreinte") empreinte: string,
    @Arg("description") description: string,
    @Arg("createdAt") createdAt: Date,
    @Arg("recipeIds", () => [Int]) recipeIds: number[]
  ): Promise<Consumption> {
    return await consumptionService.createConsRecipe(
      empreinte,
      description,
      createdAt,
      recipeIds
    );
  }
}
