import { DataSource } from "typeorm";
import BaseCarbone from "../models/BaseCarbone";
import Agribalyse from "../models/Agribalyse";
import { User } from "../models/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "carbone",
  synchronize: true,
  entities: [User, BaseCarbone, Agribalyse],
});
