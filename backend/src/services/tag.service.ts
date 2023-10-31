import { Like } from "typeorm";
import { Tag } from "../entities/tag";

export const findAll = (terms: any): Promise<Tag[]> => {
  return Tag.find({
    where: { name: Like(`%${terms}%`) },
  });
};

export const deleteTag = (id: number) => {
  return Tag.delete({ id: id });
};
