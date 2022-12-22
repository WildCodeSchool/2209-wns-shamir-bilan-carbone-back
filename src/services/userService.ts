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
  create: async (email: string, password: string): Promise<User> => {
    const newUser = new User();
    newUser.email = email;
    const salt = bcrypt.genSaltSync(10);
    newUser.hashed_password = bcrypt.hashSync(password, salt);
    newUser.role = "USER";
    return await repository.save(newUser);
  },
};
