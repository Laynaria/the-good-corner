import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { Tag } from "../entities/tag";
import * as TagService from "../services/tag.service";

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async getTags(@Arg("terms") terms: string): Promise<Tag[]> {
    return TagService.findAll(terms);
  }

  @Mutation(() => String)
  async deleteTag(@Arg("id") id: number): Promise<string> {
    await TagService.deleteTag(id);
    return `Tag deleted on id ${id}`;
  }
}
