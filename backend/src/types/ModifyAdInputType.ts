import { Field, InputType } from "type-graphql";

@InputType()
export class ModifyAdInputType {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  picture: string;

  @Field()
  location: string;

  @Field()
  categoryId: number;

  @Field((type) => [String], { nullable: true })
  tags: string[];
}
