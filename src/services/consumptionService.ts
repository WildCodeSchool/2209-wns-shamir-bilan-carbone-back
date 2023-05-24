import { Repository } from "typeorm";
import Consumption from "../models/Consumption";
import { dataSource } from "../tools/utils";

const consumptionRepository: Repository<Consumption> =
  dataSource.getRepository(Consumption);

// export default {
const consumptionService = {
  /**
   * Returns list of consumptions from DB
   * @returns array of Consumptions
   */
  getAll: async (): Promise<Consumption[]> => {
    return await consumptionRepository.find();
  },
};

export default consumptionService;
