import axios from "axios";
import { Query, Resolver } from "type-graphql";
import Agribalyse from "../models/Agribalyse";

interface AgribalyseData {
  Unité_français: string;
  Nom_du_Produit_en_Français: string;
  "Groupe_d'aliment": string;
  "Sous-groupe_d'aliment": string;
  Changement_climatique: number;
}

@Resolver(Agribalyse)
export class ApiAgribalyseResolver {
  @Query(() => [Agribalyse])
  async results(): Promise<Agribalyse[]> {
    try {
      const element = "salade";
      const { data } = await axios.get<{ results: AgribalyseData[] }>(
        `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-synthese/lines?page=1&after=1&size=999&sort=&select=Groupe_d%27aliment,Sous-groupe_d%27aliment,Nom_du_Produit_en_Fran%C3%A7ais,Changement_climatique,_id,_i&q_mode=simple&qs=${element}`
      );

      // console.log(data);
      // console.log(data.results);

      // 'return data.results' map method implemented since Agribalyse API contains french
      // characters which are not accepted by gql. We're creating 'alias' with the map() method..
      // Due to that the Interface is added above .
      return data.results.map((result: AgribalyseData) => ({
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
