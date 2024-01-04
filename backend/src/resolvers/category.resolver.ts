import { Arg, Query, Resolver, Mutation, Authorized, Ctx } from "type-graphql";
import { Category } from "../entities/category";
import * as CategoryService from "../services/category.service";
import { CreateCategoryInputType } from "../types/CreateCategoryInputType";
import { Context } from "apollo-server-core";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories(
    @Arg("terms", { nullable: true }) terms: string
  ): Promise<Category[]> {
    return CategoryService.findAll(terms);
  }

  @Mutation(() => Category)
  @Authorized("ADMIN")
  createCategory(
    @Arg("category") category: CreateCategoryInputType,
    @Ctx() ctx: Context
  ): Promise<Category> {
    return CategoryService.create({ ...category });
  }
}
