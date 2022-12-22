import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import authService from "../services/authService";
import userService from "../services/userService";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async getAllUsers(): Promise<User[]> {
    return await userService.getAll();
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const userFromDB = await userService.create(email, password);
    console.log(userFromDB);
    return userFromDB;
  }

  @Mutation(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String> {
    try {
      // get user from DB by its email
      const userFromDB = await userService.getByEmail(email);
      // verify if both password match
      if (
        await authService.verifyPassword(password, userFromDB.hashed_password)
      ) {
        // create a new token => sign a token
        const token = authService.signJwt({
          email: userFromDB.email,
          role: userFromDB.role,
        });
        // return the token
        return token;
      } else {
        throw new Error();
      }
    } catch (e) {
      throw new Error("invalid Auth");
    }
  }
}
