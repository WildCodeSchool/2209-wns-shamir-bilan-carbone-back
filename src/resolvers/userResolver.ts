<<<<<<< HEAD
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
=======
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import authService from "../services/authService";
import userService from "../services/userService";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await userService.getAll();
  }

  @Query(() => User)
  async findUserByEmail(@Arg("email") email: string): Promise<User> {
    return await userService.getByEmail(email);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ): Promise<User> {
    const userFromDB = await userService.create(
      email,
      password,
      firstName,
      lastName
    );
    console.log(userFromDB);
    return userFromDB;
  }

  // updateUser
  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ): Promise<User> {
    const updateUser = await userService.update(
      id,
      email,
      password,
      firstName,
      lastName
    );
    return updateUser;
  }

  // deleteUser
  @Mutation(() => Boolean)
  async deleteUser(@Arg("email") email: string): Promise<Boolean> {
    try {
      await userService.delete(email);
      return true;
    } catch (error) {
      return false;
    }
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
>>>>>>> 19cf02bfeafce979ba3f4b9748043d1bd14ec38c
