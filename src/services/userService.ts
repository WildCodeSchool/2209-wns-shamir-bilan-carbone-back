import { Repository } from "typeorm";
import { User } from "../models/User";
import { dataSource } from "../tools/utils";
import * as bcrypt from "bcryptjs";

const repository: Repository<User> = dataSource.getRepository(User);

export default {
  /**
   * Return the user relative to the given email
   * @param email user email
   * @returns
   */
  getByEmail: async (email: string) => {
    return await repository.findOneByOrFail({ email });
  },

  // new method
  /**
   * Returns list of users from DB
   * @returns array of Users
   */
  getAll: async (): Promise<User[]> => {
    return await repository.find();
  },

  /**
   * Create a new user in the database
   * @param email user email
   * @param password user password
   * @returns
   */
  create: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> => {
    const newUser = new User();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    const salt = bcrypt.genSaltSync(10);
    newUser.hashed_password = bcrypt.hashSync(password, salt);
    newUser.role = "USER";
    return await repository.save(newUser);
  },

  /**
   *
   * @param email user mail
   * @param password user password
   * @param firstName user firstname
   * @param lastName user lastname
   * @returns
   */

  update: async (
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> => {
    // find the user with email
    const user = await repository.findOne({ where: { id } });
    if (user === null) throw new Error("User not found, sweetheart");

    // update user fields
    user.firstName = firstName;
    user.lastName = lastName;
    const salt = bcrypt.genSaltSync(10);
    user.hashed_password = bcrypt.hashSync(password, salt);

    // save updated user
    return await repository.save(user);
  },

  /**
   * @param email user email
   */
  delete: async (email: string): Promise<void> => {
    // find user by mail
    const user = await repository.findOne({ where: { email } });
    if (user === null) throw new Error("user doesn't exists");

    // delete the user
    await repository.remove(user);
  },
};
