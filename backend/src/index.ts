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

  const stmt = db.prepare(
    "INSERT INTO ad (title, description, owner, price, picture, location, createdAt, category_id) VALUES (?, ?, ?, ?, ?, ?, ? ,?)"
  );

  stmt.run([
    body.title,
    body.description,
    body.owner,
    body.price,
    body.picture,
    body.location,
    new Date(),
    body.category_id,
  ]);

  res.send("ok");
});

// PUT By Id
app.put("/ad/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const body = req.body;

  const stmt = db.prepare(
    "UPDATE ad SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ?, category_id = ? where id = ?"
  );

  stmt.run([
    body.title,
    body.description,
    body.owner,
    body.price,
    body.picture,
    body.location,
    body.category_id,
    id,
  ]);

  res.send("Ok");
});

// DELETE
app.delete("/ad/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  db.run("DELETE from ad where id = ?", id);

  res.sendStatus(204);
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
