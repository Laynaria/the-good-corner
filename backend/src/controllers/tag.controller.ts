import express, { Request, Response } from "express";
import { Like } from "typeorm";
import { Tag } from "../entities/tag";
import * as TagService from "../services/tag.service";

const router = express.Router();

// get tags
router.get("/", async (req: Request, res: Response) => {
  const terms = req.query.terms;

  const tags = await TagService.findAll(terms);
  res.send(tags);
});

// delete tags
router.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  await TagService.deleteTag(id);

  res.sendStatus(204);
});

export default router;
