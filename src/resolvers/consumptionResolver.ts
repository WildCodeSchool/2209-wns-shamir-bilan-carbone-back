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
  async createConsumptionWithRecipeUser(
    @Arg("empreinte") empreinte: string,
    @Arg("description") description: string,
    @Arg("createdAt") createdAt: Date,
    @Arg("recipeIds", () => [Int]) recipeIds: number[],
    @Arg("userId") userId: number
  ): Promise<Consumption> {
    return await consumptionService.createConsRecipeUser(
      empreinte,
      description,
      createdAt,
      recipeIds,
      userId
    );
  }
}
