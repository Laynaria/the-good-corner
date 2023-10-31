import express, { Request, Response } from "express";
import * as AdService from "../services/ad.service";
import { Like } from "typeorm";
import { Ad } from "../entities/ad";
import { Tag } from "../entities/tag";
import { Category } from "../entities/category";

const router = express.Router();

// Get ALL
router.get("/", async (req: Request, res: Response) => {
  const categoryId: number = parseInt(req.query.categoryId as string);
  const tagName: string = req.query.tag as string;
  const terms: string = req.query.terms ? (req.query.terms as string) : "";

  let ad: Ad[];

  if (tagName && categoryId) {
    ad = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        tags: { name: tagName },
        category: {
          id: categoryId,
        },
        title: Like(`%${terms}%`),
      },
    });
    return res.send(ad);
  }

  if (tagName) {
    ad = await Ad.find({
      relations: {
        tags: true,
      },
      where: {
        tags: { name: tagName },
        title: Like(`%${terms}%`),
      },
    });
    return res.send(ad);
  }

  if (categoryId) {
    ad = await Ad.find({
      relations: {
        category: true,
      },
      where: {
        category: {
          id: categoryId,
        },
        title: Like(`%${terms}%`),
      },
    });
    return res.send(ad);
  }

  ad = await Ad.find({
    relations: {
      category: true,
      tags: true,
    },
    where: { title: Like(`%${terms}%`) },
  });
  res.send(ad);
});

// Get By ID
router.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const ad = await AdService.findById(id);
  res.send(ad);
});

// POST
router.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  const ad = await AdService.create(body);

  res.send(ad);
});

// PUT By Id
router.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const body = req.body;

  try {
    const ad = await AdService.modify(body, id);
    res.send(ad);
  } catch (e) {
    res.sendStatus(404);
  }
});

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  await Ad.delete({ id: id });

  res.sendStatus(204);
});

// get ad from clothes category
// router.get("/ad-clothes", (req: Request, res: Response) => {
//     db.all(
//       "SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'vêtement'",
//       (err, rows) => {
//         res.send(rows);
//       }
//     );
//   });

// get ad from clothe and car category
// router.get("/ad-clothes-and-cars", (req: Request, res: Response) => {
//     db.all(
//       "SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'vêtement' OR c.name = 'voiture'",
//       (err, rows) => {
//         res.send(rows);
//       }
//     );
//   });

// get ad from category starting by V
// router.get("/ad-start-by-v", (req: Request, res: Response) => {
//     db.all(
//       "SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name LIKE 'v%'",
//       (err, rows) => {
//         res.send(rows);
//       }
//     );
//   });

export default router;
