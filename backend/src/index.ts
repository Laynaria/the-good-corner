import "reflect-metadata";
import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
import { dataSource } from "./config/db";
import { Ad } from "./entities/ad";

const app = express();

app.use(express.json());

const port: number = 3000;

const db = new sqlite3.Database("good_corner.sqlite");

// Get ALL
app.get("/ad", async (req: Request, res: Response) => {
  const ad = await Ad.find();
  res.send(ad);
});

// Get By ID
app.get("/ad/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const ad = await Ad.findOneBy({ id });
  res.send(ad);
});

// get ad from clothes category
app.get("/ad-clothes", (req: Request, res: Response) => {
  db.all(
    "SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'vêtement'",
    (err, rows) => {
      res.send(rows);
    }
  );
});

// get ad from clothe and car category
app.get("/ad-clothes-and-cars", (req: Request, res: Response) => {
  db.all(
    "SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'vêtement' OR c.name = 'voiture'",
    (err, rows) => {
      res.send(rows);
    }
  );
});

// get avg price from other category
app.get("/avg-price-other", (req: Request, res: Response) => {
  db.all(
    "SELECT AVG(price), c.name FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'autre'",
    (err, rows) => {
      res.send(rows);
    }
  );
});

// get ad from category starting by V
app.get("/ad-start-by-v", (req: Request, res: Response) => {
  db.all(
    "SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name LIKE 'v%'",
    (err, rows) => {
      res.send(rows);
    }
  );
});

// POST
app.post("/ad", (req: Request, res: Response) => {
  const body = req.body;

  const ad = new Ad();
  ad.title = body.title;
  ad.description = body.description;
  ad.owner = body.owner;
  ad.price = body.price;
  ad.picture = body.picture;
  ad.location = body.location;
  ad.createdAt = new Date();
  ad.save();

  res.send(ad);
});

// PUT By Id
app.put("/ad/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const body = req.body;

  const ad = await Ad.findOneBy({ id });

  if (ad) {
    ad.title = body.title;
    ad.description = body.description;
    ad.owner = body.owner;
    ad.price = body.price;
    ad.picture = body.picture;
    ad.location = body.location;
    ad.save();
    res.send(ad);
    return;
  }

  res.sendStatus(404);
});

// DELETE
app.delete("/ad/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  await Ad.delete({ id: id });

  res.sendStatus(204);
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
