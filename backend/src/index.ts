import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import { dataSource } from "./config/db";

import adController from "./controllers/ad.controller";
import categoryController from "./controllers/category.controller";
import tagController from "./controllers/tag.controller";

const app = express();
const port: number = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/ad", adController);
app.use("/categories", categoryController);
app.use("/tags", tagController);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
