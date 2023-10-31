import express, { Request, Response } from "express";
import { Like } from "typeorm";
import { Category } from "../entities/category";

const router = express.Router();

// get categories

router.get("/", async (req: Request, res: Response) => {
  const terms = req.query.terms;

  const categories = await Category.find({
    where: { name: Like(`%${terms}%`) },
  });
  res.send(categories);
});

// post categories
router.post("/", (req: Request, res: Response) => {
  const body = req.body;

  const category = new Category();
  category.name = body.name;

  category.save();
  res.send(category);
});

// get avg price from other category
// app.get("/avg-price-other", (req: Request, res: Response) => {
//     db.all(
//       "SELECT AVG(price), c.name FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'autre'",
//       (err, rows) => {
//         res.send(rows);
//       }
//     );
//   });

export default router;
