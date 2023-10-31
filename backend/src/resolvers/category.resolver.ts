import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { Category } from "../entities/category";
import * as CategoryService from "../services/category.service";
import { CreateCategoryInputType } from "../types/CreateCategoryInputType";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(@Arg("terms") terms: string): Promise<Category[]> {
    return CategoryService.findAll(terms);
  }

  @Mutation(() => Category)
  createCategory(
    @Arg("category") category: CreateCategoryInputType
  ): Promise<Category> {
    return CategoryService.create({ ...category });
  }
}
