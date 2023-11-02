import { Like } from "typeorm";
import { Category } from "../entities/category";

export const findAll = (terms: any = ""): Promise<Category[]> => {
  return Category.find({
    where: { name: Like(`%${terms}%`) },
  });
};

export const create = (body: any): Promise<Category> => {
  const category = new Category();
  category.name = body.name;

  return category.save();
};
