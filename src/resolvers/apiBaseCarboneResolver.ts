import axios from "axios";
import { Query, Resolver } from "type-graphql";
import BaseCarbone from "../models/BaseCarbone";

interface CarbonBaseData {
  Nom_base_français: string;
  Total_poste_non_décomposé: string;
  Unité_français: string;
}

@Resolver(BaseCarbone)
export class ApiBaseCarboneResolver {
  @Query(() => [BaseCarbone])
  async results(): Promise<BaseCarbone[]> {
    try {
      const { data } = await axios.get<{ results: CarbonBaseData[] }>(
        "https://data.ademe.fr/data-fair/api/v1/datasets/base-carbone(r)/lines?size=500&sort=Total_poste_non_d%C3%A9compos%C3%A9&select=Nom_base_fran%C3%A7ais,Unit%C3%A9_fran%C3%A7ais,Total_poste_non_d%C3%A9compos%C3%A9,_i&q=numerique&q_mode=simple&collapse=Nom_base_fran%C3%A7ais"
      );

      // console.log(data);
      // console.log(data.results);

      // 'return data.results' is made complex with map method since CarboneBase API contains french
      // characters which are not accepted by gql. We're creating 'alias' with the map() method..
      // Due to this detail the Interface is added above .
      return data.results.map((result: CarbonBaseData) => ({
        ...result,
        name: result.Nom_base_français,
        empreinte: result.Total_poste_non_décomposé,
        unit: result.Unité_français,
      }));
    } catch (e) {
      throw new Error();
    }
  }
}
