import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Recipe } from "./Recipe";

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

  //this no  @Field(() => Recipe)
  // @ManyToOne(() => Recipe, (recipe: Recipe) => recipe.agribalyses)
  // @JoinColumn({ name: "recipe_id" })
  // recipe?: Recipe;

  // @ManyToOne(() => Recipe, (recipe: Recipe) => recipe.agribalyses)
  // recipe?: Recipe;
}
