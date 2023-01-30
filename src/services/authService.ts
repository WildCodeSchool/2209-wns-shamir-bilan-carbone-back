import { Repository } from "typeorm";
import { User } from "../models/User";
import { dataSource } from "../tools/utils";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const repository: Repository<User> = dataSource.getRepository(User);

export default {
  /**
   * Return true if the password is the same as the hashed password
   * @param password password
   * @param hashedPassword hashed_password
   * @returns
   */
  verifyPassword: async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
  },

  /**
   * Return a signed payload
   * @param payload to sign
   * @returns
   */
  signJwt: (payload: any) => {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });
  },

  /**
   * Return the token payload from the token in param
   * @param token token to verify
   * @returns
   */
  verifyToken: (token: string) => {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }

    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  },

  hasRole: async (email: string, role: string) => {
    // get the user in DB
    const user = await repository.findOne({ where: { email } });
    // verify roles
    if (user?.role !== "ADMIN") {
      return false;
    }
    // return true or false
    return true;
  },
};
