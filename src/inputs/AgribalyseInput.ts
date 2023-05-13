import { InputType, Field } from "type-graphql";
// import { Length, IsEmail, MinLength } from "class-validator";

@InputType()
export class AgribalyseInput {
  @Field()
  idAgr: string;

  @Field({ nullable: true })
  subgroup?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  empreinte?: string;
}
