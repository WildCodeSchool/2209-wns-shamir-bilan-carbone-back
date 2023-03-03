import { DataSource } from "typeorm";
import BaseCarbone from "../models/BaseCarbone";
import ApiAgribalyse from "../models/ApiAgribalyse";
import { User } from "../models/User";
import Agribalyse from "../models/Agribalyse";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "carbone",
  synchronize: true,
  entities: [User, BaseCarbone, ApiAgribalyse, Agribalyse],
});

