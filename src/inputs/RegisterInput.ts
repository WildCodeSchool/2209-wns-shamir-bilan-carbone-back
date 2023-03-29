import { InputType, Field } from "type-graphql";
import { Length, IsEmail, MinLength } from "class-validator";

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  @Length(1, 30)
  lastName: string;
}
