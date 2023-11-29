import { DataSource } from "typeorm";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "good-corner",
  password: "supermdp",
  database: "good_corner_db",
  entities: [Ad, Category, Tag],
  // entities: ["src/entities/*.ts"],
  synchronize: true,
});
