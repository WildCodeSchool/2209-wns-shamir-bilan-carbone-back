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
  async createConsumption(
    @Arg("empreinte") empreinte: string,
    @Arg("description") description: string,
    @Arg("createdAt") createdAt: Date,
    @Arg("userId") userId: number
  ): Promise<Consumption> {
    return consumptionService.createConsumption(
      empreinte,
      description,
      createdAt,
      userId
    );
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
  // @Query(() => [Consumption])
  // async getWeeklyConsumption(
  //   @Arg("userId") userId: number
  // ): Promise<Consumption[]> {
  //   const weeklyConsumption = await consumptionService.getByWConsumption(
  //     userId
  //   );
  //   console.log("wanteddata", weeklyConsumption);
  // const result = weeklyConsumption.map((item) => {
  //   const consumption = new Consumption();
  //   consumption.weeklyEmpreinte = parseFloat(item.sum);
  //   consumption.week = item.weekOfYear;
  //   // Set other fields if needed
  //   return consumption;
  // });
  // return result;
  // }
}
