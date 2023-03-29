import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import { RegisterInput } from "../inputs/RegisterInput";
import { User } from "../models/User";
import authService from "../services/authService";
import userService from "../services/userService";
import { MyContext } from "../types/MyContext";

@Resolver(User)
export class UserResolver {
  @Authorized("ADMIN")
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
    // @Arg("email") email: string,
    // @Arg("password") password: string,
    // @Arg("firstName") firstName: string,
    // @Arg("lastName") lastName: string
    @Arg("data") { email, password, firstName, lastName }: RegisterInput
  ): Promise<User> {
    const userFromDB = await userService.create(
      email,
      password,
      firstName,
      lastName
    );
    // console.log(userFromDB);
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
    // @Ctx() ctx: MyContext
  ): Promise<String> {
    try {
      // get user from DB by its email
      const userFromDB = await userService.getByEmail(email);
      console.log(userFromDB);
      // verify if both password match
      if (
        await authService.verifyPassword(password, userFromDB.hashed_password)
      ) {
        // create a new token => sign a token
        const token = authService.signJwt({
          email: userFromDB.email,
          role: userFromDB.role,
          id: userFromDB.id,
        });

        // adding this code
        // set user information in the context object
        // ctx.user = {
        //   id: userFromDB.id,
        //   email: userFromDB.email,
        //   role: userFromDB.role,
        //   hashed_password: userFromDB.hashed_password,
        //   firstName: userFromDB.firstName,
        //   lastName: userFromDB.lastName,
        // };

        // console.log(ctx.user);
        //end of added code

        // return the token
        return token;
      } else {
        throw new Error();
      }
    } catch (e) {
      throw new Error("invalid Auth");
    }
  }

  // @Query(() => User, { nullable: true })
  // // @Authorized()
  // async me(@Ctx() ctx: MyContext): Promise<User | null> {
  //   const userId = ctx.user?.id;
  //   console.log(userId);
  //   if (!userId) {
  //     return null;
  //   }

  //   const user = await userService.getById(userId);
  //   return user || null;
  // }
}
