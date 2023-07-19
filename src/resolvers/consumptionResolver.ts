import { Consumption } from "../models/Consumption";
import consumptionService from "../services/consumptionService";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Consumption)
export class ConsumptionResolver {
  @Query(() => [Consumption])
  async getAllConsumptions(): Promise<Consumption[]> {
    return consumptionService.getAll();
  }

  @Mutation(() => Consumption)
  async createConsumptionWithRecipeUser(
    @Arg("empreinte") empreinte: string,
    @Arg("description") description: string,
    @Arg("createdAt") createdAt: Date,
    // @Arg("recipeIds", () => [Int]) recipeIds: number[],
    @Arg("recipeIds", () => [String]) recipeIds: string[],
    @Arg("userId") userId: number
  ): Promise<Consumption> {
    return consumptionService.createConsRecipeUser(
      empreinte,
      description,
      createdAt,
      recipeIds,
      userId
    );
  }

  // get All Consumptions By UserId
  @Query(() => [Consumption])
  async getConsByUser(@Arg("userId") userId: number): Promise<Consumption[]> {
    return consumptionService.getConsByUserId(userId);
  }

  // get user's Weekly consumption
  @Query(() => [Consumption])
  async getWeeklyConsumption(
    @Arg("userId") userId: number
  ): Promise<Consumption[]> {
    return consumptionService.getByWConsumption(userId);
  }
}
