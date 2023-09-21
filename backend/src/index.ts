import express, { Request, Response, response } from "express";
import { Ad } from "./types/ad";
import sqlite3 from "sqlite3";

const app = express();

app.use(express.json());

const port: number = 3000;

const db = new sqlite3.Database("good_corner.sqlite");

// const ads: Ad[] = [
//   {
//     id: 1,
//     title: "Bike to sell",
//     description:
//       "My bike is blue, working fine. I'm selling it because I've got a new one",
//     owner: "bike.seller@gmail.com",
//     price: 100,
//     picture:
//       "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
//     location: "Paris",
//     createdAt: "2023-09-05T10:13:14.755Z",
//   },
//   {
//     id: 2,
//     title: "Car to sell",
//     description:
//       "My car is blue, working fine. I'm selling it because I've got a new one",
//     owner: "car.seller@gmail.com",
//     price: 10000,
//     picture:
//       "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
//     location: "Paris",
//     createdAt: "2023-10-05T10:14:15.922Z",
//   },
// ];

// GET
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/ad", (req: Request, res: Response) => {
  // res.send(ads);
  db.all("SELECT * from ad", (err, rows) => {
    res.send(rows);
  });
});

app.get("/ad/:id", (req: Request, res: Response) => {
  // pas bon pour l'incrémentation sans doute find
  const id: number = parseInt(req.params.id);

  // res.send(ads[ads.findIndex((ad) => ad.id === id)]);

  db.get("SELECT * from ad WHERE id = ?", [id], (err, row) => {
    res.send(row);
  });
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
  // ads.push(req.body);
  // res.send("Request received, check the backend terminal!");

  // const ids: number[] = ads.map<number>((ad) => ad.id);

  // const ad: Ad = {
  //   id: Math.max(...ids) + 1,
  //   ...req.body,
  // };

  // ads.push(ad);
  // res.send(ads);

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
  // pas bon pour l'incrémentation
  // const id = parseInt(req.params.id);
  // ads[id - 1] = req.body;
  // res.send("Request received, check the backend terminal!");

  const id: number = parseInt(req.params.id);

  // const newAds: Ad[] = ads.map<Ad>((ad) => {
  //   if (ad.id === id) {
  //     return { ...ad, ...req.body };
  //   }

  //   return ad;
  // });

  // res.send(newAds);

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
  // ads = ads.filter((elem) => elem.id !== parseInt(req.params.id));
  // res.send("Request received, check the backend terminal!");

  // on pouvait res.send(ads) à chaque fois plutôt

  const id: number = parseInt(req.params.id);

  // ads.splice(ads.findIndex((ad) => ad.id === id));

  // res.send(ads);

  db.run("DELETE from ad where id = ?", id);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
