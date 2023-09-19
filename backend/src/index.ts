import express, { Request, Response, response } from "express";
import { Ad } from "./types/ad";

const app = express();

app.use(express.json());

const port: number = 3000;

const ads: Ad[] = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];

// GET
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/ad", (req: Request, res: Response) => {
  res.send(ads);
});

app.get("/ad/:id", (req: Request, res: Response) => {
  // pas bon pour l'incrémentation sans doute find
  const id = parseInt(req.params.id);
  res.send(ads[ads.findIndex((ad) => ad.id === id)]);
});

// POST
app.post("/ad", (req: Request, res: Response) => {
  // ads.push(req.body);
  // res.send("Request received, check the backend terminal!");

  const ids: number[] = ads.map<number>((ad) => ad.id);

  const ad: Ad = {
    id: Math.max(...ids) + 1,
    ...req.body,
  };

  ads.push(ad);
  res.send(ads);
});

// PUT By Id
app.put("/ad/:id", (req: Request, res: Response) => {
  // pas bon pour l'incrémentation
  // const id = parseInt(req.params.id);
  // ads[id - 1] = req.body;
  // res.send("Request received, check the backend terminal!");

  const id: number = parseInt(req.params.id);

  const newAds: Ad[] = ads.map<Ad>((ad) => {
    if (ad.id === id) {
      return { ...ad, ...req.body };
    }

    return ad;
  });

  res.send(newAds);
});

// DELETE
app.delete("/ad/:id", (req: Request, res: Response) => {
  // ads = ads.filter((elem) => elem.id !== parseInt(req.params.id));
  // res.send("Request received, check the backend terminal!");

  // on pouvait res.send(ads) à chaque fois plutôt

  const id: number = parseInt(req.params.id);

  ads.splice(ads.findIndex((ad) => ad.id === id));

  res.send(ads);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
