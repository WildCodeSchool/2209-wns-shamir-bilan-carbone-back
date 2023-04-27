import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Recipe } from "../models/Recipe";

@ObjectType()
@Entity()
export default class Agribalyse {
  @Field({ nullable: true })
  @Column({ nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  idAgr: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subgroup?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  empreinte?: string;

  // @ManyToOne(() => Recipe, (recipe) => recipe.agribalyses)
  // recipe: Recipe;
  @ManyToMany(() => Recipe, (recipe) => recipe.agribalyses)
  @JoinTable()
  // recipes: Recipe[];
  recipe: Recipe[];
}
