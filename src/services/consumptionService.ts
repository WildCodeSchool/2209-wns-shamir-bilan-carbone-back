import { Repository } from "typeorm";
import Consumption from "../models/Consumption";
import Recipe from "../models/Recipe";
import { User } from "../models/User";
import { dataSource } from "../tools/utils";

const consumptionRepository: Repository<Consumption> =
  dataSource.getRepository(Consumption);
const recipeRepository: Repository<Recipe> = dataSource.getRepository(Recipe);
const userRepository: Repository<User> = dataSource.getRepository(User);

const consumptionService = {
  /**
   * Returns list of consumptions from DB sorted by Date
   * @returns array of Consumptions
   */
  getAll: async (): Promise<Consumption[]> => {
    // Use the query builder to sort by createdAt in ascending order
    const consumptions = await consumptionRepository
      .createQueryBuilder("consumption")
      .leftJoinAndSelect("consumption.user", "user")
      .orderBy("consumption.createdAt", "ASC")
      .getMany();
    // const consumptions = await consumptionRepository.find({
    //   relations: ["user"],
    // });
    return consumptions;
  },

  /**
   *
   * @param empreinte
   * @param description
   * @param createdAt
   * @param userId
   * @returns
   */
  createConsumption: async (
    empreinte: string,
    description: string,
    createdAt: Date,
    userId: number
  ): Promise<Consumption> => {
    const consumption = new Consumption();

    consumption.empreinte = empreinte;
    consumption.description = description;

    const date = new Date();
    const timestamp = date.getTime();
    consumption.createdAt = date;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User id: ${userId} not found`);
    }

    consumption.user = user;

    return consumptionRepository.save(consumption);
  },

  /**
   *
   * @param empreinte
   * @param description
   * @param createdAt
   * @param recipeIds
   * @param userId
   * @returns
   */
  createConsRecipeUser: async (
    empreinte: string,
    description: string,
    createdAt: Date,
    // recipeIds: number[],
    recipeIds: string[],
    userId: number
  ): Promise<Consumption> => {
    const consumption = new Consumption();

    consumption.description = description;
    // consumption.createdAt = new Date(Date.now());

    // consumption.createdAt = new Date();

    const date = new Date();
    const timestamp = date.getTime();
    consumption.createdAt = date;
    // const weekNumber = getWeekNumber(timestamp);

    // console.log("weeknumber", weekNumber);
    console.log("timestamp", timestamp);
    console.log("newDate", new Date());
    console.log("newDateNow", new Date(Date.now()));

    const recipes = [];
    for (let recipeId of recipeIds) {
      // const recipe = await recipeRepository.findOneByOrFail({ id: recipeId });
      const recipe = await recipeRepository.findOneByOrFail({
        id: parseInt(recipeId),
      });
      recipes.push(recipe);
    }
    const sumEmpreintOfRecipes = recipes.reduce(
      (total, recipe) => total + parseFloat(recipe.calcul || "0"),
      0
    );

    consumption.empreinte = sumEmpreintOfRecipes.toString();
    consumption.recipes = recipes;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User id: ${userId} not found`);
    }

    // consumption.user = user;
    consumption.user = user;

    return consumptionRepository.save(consumption);
  },

  /** */
  getConsByUserId: async (userId: number): Promise<Consumption[]> => {
    const consumptions = consumptionRepository.find({
      relations: ["user"],
      where: {
        user: {
          id: userId,
        },
      },
    });

    return consumptions;
  },

  getByWConsumption: async (userId: number): Promise<Consumption[]> => {
    const wEmpreinte: Consumption[] = await consumptionRepository
      .createQueryBuilder("consumption")
      // Calculate the sum of empreinte (carbon footprint) and format it as numeric
      .addSelect("SUM(CAST(consumption.empreinte AS numeric))", "sum")
      // Format the createdAt timestamp as 'IW YYYY' (e.g., '35 2023')
      .addSelect("to_char(consumption.createdAt, 'IW YYYY')", "weekOfYear")
      // Filter the data for a specific user ID
      .where("consumption.user_id = :userId", { userId })
      //  Group the results by both consumption.id and the formatted week and year / instead of grouping "groupByYear"
      .groupBy("consumption.id, to_char(consumption.createdAt, 'IW YYYY')")
      // Retrieve the result as raw data in an array
      .getRawMany();

    // console.log("wEmpreinte", wEmpreinte);
    return wEmpreinte;
  },
};

export default consumptionService;
