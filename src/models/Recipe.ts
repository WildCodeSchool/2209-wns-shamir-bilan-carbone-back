import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Agribalyse from "../models/Agribalyse";
import Consumption from "../models/Consumption";

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

  // @Field(() => [Agribalyse], { nullable: true })
  // @OneToMany(() => Agribalyse, (agribalyse) => agribalyse.recipe, {
  //   cascade: false,
  // })
  // agribalyses?: Agribalyse[];

  @Field(() => [Agribalyse], { nullable: true })
  @ManyToMany(() => Agribalyse, (agribalyse) => agribalyse.recipe, {
    cascade: true,
  })
  agribalyses?: Agribalyse[];

  // @Field(() => [Consumption], { nullable: true })
  @ManyToMany(() => Consumption, (consumption) => consumption.recipes, {
    cascade: true,
  })
  @JoinTable()
  consumptions?: Consumption[];
}

export default Recipe;
