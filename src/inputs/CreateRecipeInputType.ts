import { InputType, Field } from "type-graphql";
import { AgribalyseInput } from "../inputs/AgribalyseInput";
import { Length, IsEmail, MinLength } from "class-validator";

@InputType()
export class CreateRecipeInputType {
  @Field()
  @Length(1, 100)
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  calcul: string;

  @Field((type) => AgribalyseInput)
  agribalyse: AgribalyseInput;
}
