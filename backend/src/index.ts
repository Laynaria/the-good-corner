import "reflect-metadata";
import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
import { Like } from "typeorm";
import { dataSource } from "./config/db";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";

const app = express();

app.use(express.json());

const port: number = 3000;

const db = new sqlite3.Database("good_corner.sqlite");

// Get ALL
app.get("/ad", async (req: Request, res: Response) => {
  const categoryId: number = parseInt(req.query.categoryId as string);

  let ad: Ad[];
  if (categoryId) {
    ad = await Ad.find({
      relations: {
        category: true,
      },
      where: {
        category: {
          id: categoryId,
        },
      },
    });
    return res.send(ad);
  }

  ad = await Ad.find({
    relations: {
      category: true,
    },
  });
  res.send(ad);
});

// Get By ID
app.get("/ad/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const ad = await Ad.findOne({
    relations: {
      category: true,
    },
    where: { id: id },
  });
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
app.post("/ad", async (req: Request, res: Response) => {
  const body = req.body;

  const ad = new Ad();
  ad.title = body.title;
  ad.description = body.description;
  ad.owner = body.owner;
  ad.price = body.price;
  ad.picture = body.picture;
  ad.location = body.location;
  ad.createdAt = new Date();

  const category = await Category.findOneBy({ id: req.body.category_id });

  if (category) {
    ad.category = category;
  }

  const tagsName = req.body.tags;
  if (tagsName && tagsName.lenght > 0) {
    const tagsEntities: Tag[] = [];

    for (const tagName of tagsName) {
      let tag = await Tag.findOneBy({ name: tagName });

      if (!tag) {
        tag = new Tag();
        tag.name = tagName;
      }

      tagsEntities.push(tag);
    }

    ad.tags = tagsEntities;
  }

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

    const category = await Category.findOneBy({ id: req.body.category_id });

    if (category) {
      ad.category = category;
    }

    const tagsName = req.body.tags;
    if (tagsName && tagsName.lenght > 0) {
      const tagsEntities: Tag[] = [];

      for (const tagName of tagsName) {
        let tag = await Tag.findOneBy({ name: tagName });

        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
        }

        tagsEntities.push(tag);
      }

      ad.tags = tagsEntities;
    }

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

// get categories

app.get("/categories", async (req: Request, res: Response) => {
  const terms = req.query.terms;

  const categories = await Category.find({
    where: { name: Like(`%${terms}%`) },
  });
  res.send(categories);
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
