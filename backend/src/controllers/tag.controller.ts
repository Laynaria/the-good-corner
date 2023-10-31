import express, { Request, Response } from "express";
import { Like } from "typeorm";
import { Tag } from "../entities/tag";

const router = express.Router();

// get tags
router.get("/", async (req: Request, res: Response) => {
  const terms = req.query.terms;

  const tags = await Tag.find({
    where: { name: Like(`%${terms}%`) },
  });
  res.send(tags);
});

// delete tags
router.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  await Tag.delete({ id: id });

  res.sendStatus(204);
});

export default router;
