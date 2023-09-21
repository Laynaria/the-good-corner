import { DataSource } from "typeorm";
import { Ad } from "../entities/ad";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./good_corner.sqlite",
  entities: [Ad],
  synchronize: true,
});
