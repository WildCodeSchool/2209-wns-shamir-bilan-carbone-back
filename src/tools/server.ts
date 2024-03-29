import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { dataSource } from "./utils";
import * as dotenv from "dotenv";
import { UserResolver } from "../resolvers/userResolver";
import authService from "../services/authService";
import { ApiBaseCarboneResolver } from "../resolvers/apiBaseCarboneResolver";
import { ApiAgribalyseResolver } from "../resolvers/apiAgribalyseResolver";
import { AgribalyseResolver } from "../resolvers/AgribalyseResolver";
import { RecipeResolver } from "../resolvers/RecipeResolver";
import { ConsumptionResolver } from "../resolvers/consumptionResolver";

async function createServer(): Promise<ApolloServer> {
  dotenv.config();
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ApiBaseCarboneResolver,
      ApiAgribalyseResolver,
      AgribalyseResolver,
      RecipeResolver,
      ConsumptionResolver,
    ],
    validate: { forbidUnknownValues: false },
    authChecker: ({ context }, roles) => {
      console.log("CONTEXT", context);
      console.log("ROLES", roles);

      if (context.user === undefined) {
        return false;
      }
      if (roles.length === 0 || roles.includes(context.user.role)) {
        return true;
      }

      return false;
    },
  });
  return new ApolloServer({
    schema,
    context: ({ req }) => {
      if (
        req?.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      } else {
        try {
          const bearer = req.headers.authorization.split("Bearer ")[1];
          const userPayload = authService.verifyToken(bearer);

          return { user: userPayload };
        } catch (e: any) {
          console.log(e.details);
          return {};
        }
      }
    },
  });
}
export default createServer;
