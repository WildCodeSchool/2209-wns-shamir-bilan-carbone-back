<<<<<<< HEAD
import { DataSource } from "typeorm";
import { User } from "../models/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "carbone",
  synchronize: true,
  entities: [User],
});
=======
import { DataSource } from "typeorm";
import { User } from "../models/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "carbone",
  synchronize: true,
  entities: [User],
});
>>>>>>> 19cf02bfeafce979ba3f4b9748043d1bd14ec38c
