import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Agribalyse from "../models/Agribalyse";

@ObjectType()
@Entity()
export class Recipe {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  calcul?: string;

  @Field(() => [Agribalyse], { nullable: true })
  // @Column("json", { nullable: true })
  @OneToMany(() => Agribalyse, (agribalyse) => agribalyse.recipe, {
    cascade: true,
  })
  agribalyses?: Agribalyse[];
}

export default Recipe;
