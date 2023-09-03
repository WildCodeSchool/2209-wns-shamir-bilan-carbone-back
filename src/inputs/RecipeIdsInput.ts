import { InputType, Field, Int } from "type-graphql";

@InputType()
export class RecipeIdsInput {
  @Field(() => [Int])
  ids: number[];
}
