import { Repository } from "typeorm";
import Agribalyse from "../models/Agribalyse";
import { dataSource } from "../tools/utils";

const agribalyseRepository: Repository<Agribalyse> =
  dataSource.getRepository(Agribalyse);

export default {
  /**
   * Returns list of aliments from DB
   * @returns array of Aliments from Agribalyse
   */
  getAllAliments: async (): Promise<Agribalyse[]> => {
    return await agribalyseRepository.find();
  },

  /**
   * Return aliments containing searched string in aliments' name
   * @param name aliment's name
   * @returns
   */
  getByName: async (name: string) => {
    return await agribalyseRepository.findOneByOrFail({ name });
  },

  getById: async (id: number): Promise<Agribalyse | null> => {
    return await agribalyseRepository.findOne({ where: { id: id } });
  },
};
