import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInputType {
  @Field()
  name: string;
}
