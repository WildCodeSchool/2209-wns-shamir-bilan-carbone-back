/* eslint-disable @typescript-eslint/return-await */
import { Resolver, Query, Arg } from "type-graphql";
import Agribalyse from "../models/Agribalyse";
import agribalyseService from "../services/agribalyseService";

@Resolver(Agribalyse)
export class AgribalyseResolver {
  @Query(() => [Agribalyse])
  async getAllAliments(): Promise<Agribalyse[]> {
    return await agribalyseService.getAllAliments();
  }

  @Query(() => Agribalyse)
  async findAlimentByName(@Arg("name") name: string | ""): Promise<Agribalyse> {
    return await agribalyseService.getByName(name);
  }
}
