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
}
