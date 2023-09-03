/* eslint-disable @typescript-eslint/return-await */
import { Resolver, Query, Arg, Authorized } from "type-graphql";
import Agribalyse from "../models/Agribalyse";
import agribalyseService from "../services/agribalyseService";

@Resolver(Agribalyse)
export class AgribalyseResolver {
  // @Authorized(["ADMIN", "USER"])
  @Query(() => [Agribalyse])
  async getAllAliments(): Promise<Agribalyse[]> {
    return await agribalyseService.getAllAliments();
  }

  @Query(() => Agribalyse)
  async findAlimentByName(@Arg("name") name: string | ""): Promise<Agribalyse> {
    return await agribalyseService.getByName(name);
  }
}
