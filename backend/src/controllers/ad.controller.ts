import express, { Request, Response } from "express";
import * as AdService from "../services/ad.service";

const router = express.Router();

// Get ALL
router.get("/", async (req: Request, res: Response) => {
  const categoryId: number = parseInt(req.query.categoryId as string);
  const tagName: string = req.query.tag as string;
  const terms: string = req.query.terms ? (req.query.terms as string) : "";

  const ad = await AdService.findAll(categoryId, tagName, terms);

  return res.send(ad);
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

  await AdService.deleteAd(id);

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
