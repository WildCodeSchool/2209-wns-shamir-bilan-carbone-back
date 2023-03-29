import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
// import { MaxLength } from "class-validator";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  // @Column("text", { unique: false })
  @Column()
  email: string;

  @Column()
  hashed_password: string;

  // @Field()
  @Column()
  role: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;
}
