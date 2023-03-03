import axios from "axios";
import { Query, Resolver } from "type-graphql";
import ApiAgribalyse from "../models/ApiAgribalyse";

interface ApiAgribalyseData {
  Unité_français: string;
  Nom_du_Produit_en_Français: string;
  "Groupe_d'aliment": string;
  "Sous-groupe_d'aliment": string;
  Changement_climatique: number;
}

@Resolver(ApiAgribalyse)
export class ApiAgribalyseResolver {
  @Query(() => [ApiAgribalyse])
  async results(): Promise<ApiAgribalyse[]> {
    try {
      const element = "salade";
      const { data } = await axios.get<{ results: ApiAgribalyseData[] }>(
        `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-synthese/lines?page=1&after=1&size=999&sort=&select=Groupe_d%27aliment,Sous-groupe_d%27aliment,Nom_du_Produit_en_Fran%C3%A7ais,Changement_climatique,_id,_i&q_mode=simple&qs=${element}`
      );

      // console.log(data);
      // console.log(data.results);

      // 'return data.results' map method implemented since Agribalyse API contains french
      // characters which are not accepted by gql. We're creating 'alias' with the map() method..
      // Due to that the Interface is added above .
      return data.results.map((result: ApiAgribalyseData) => ({
        ...result,
        name: result.Nom_du_Produit_en_Français,
        group: result["Groupe_d'aliment"],
        subgroup: result["Sous-groupe_d'aliment"],
        empreinte: result.Changement_climatique,
      }));
    } catch (e) {
      throw new Error();
    }
  }
}
