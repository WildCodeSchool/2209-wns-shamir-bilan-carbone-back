import { Repository } from "typeorm";
import Consumption from "../models/Consumption";
import Recipe from "../models/Recipe";
import { User } from "../models/User";
import { dataSource } from "../tools/utils";

const consumptionRepository: Repository<Consumption> =
  dataSource.getRepository(Consumption);
const recipeRepository: Repository<Recipe> = dataSource.getRepository(Recipe);
const userRepository: Repository<User> = dataSource.getRepository(User);

// function getWeekNumber(timestamp: number): number {
//   // Create a new date object using the provided timestamp
//   const date = new Date(timestamp);

//   // Set the date to the first day of the year
//   date.setMonth(0, 1);

//   // Get the day of the week for the first day of the year
//   const firstDayOfWeek = date.getDay();

//   // Adjust the first day of the week to be Monday (0-based index)
//   const adjustedFirstDayOfWeek = (firstDayOfWeek + 6) % 7;

//   // Calculate the number of days between the first day of the year and the input date
//   const timeDiff = timestamp - date.getTime();
//   const dayDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

//   // Calculate the week number based on the number of days and the adjusted first day of the week
//   const weekNumber = Math.floor((dayDiff + adjustedFirstDayOfWeek) / 7) + 1;

//   return weekNumber;
// }

// export default {
const consumptionService = {
  /**
   * Returns list of consumptions from DB
   * @returns array of Consumptions
   */
  getAll: async (): Promise<Consumption[]> => {
    const consumptions = await consumptionRepository.find({
      relations: ["user"],
    });
    return consumptions;
  },

  /**
   *
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
      // .select("SUM(consumption.empreinte)", "sum")
      // .addSelect("CAST(consumption.empreinte AS INTEGER)", "sum")
      .addSelect("SUM(CAST(consumption.empreinte AS numeric))", "sum")
      .addSelect("to_char(consumption.createdAt, 'S\"%v\" YYYY')", "week")
      // .addSelect('DATE_FORMAT(consumption.createdAt, "S%v %Y")', "week")
      .where("consumption.user_id = :userId", { userId })
      // .groupBy("week")
      .groupBy("consumption.id, week")
      .getRawMany();

    console.log("wEmpreinte", wEmpreinte);
    return wEmpreinte;
  },
};

export default consumptionService;
