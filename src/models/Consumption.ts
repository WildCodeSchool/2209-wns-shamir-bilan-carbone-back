import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Recipe from "../models/Recipe";
import { User } from "../models/User";

@ObjectType()
@Entity()
export class Consumption {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  empreinte?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  createdAt?: Date;

  @Field(() => [Recipe], { nullable: true })
  @ManyToMany(() => Recipe, (recipe) => recipe.consumptions)
  @JoinTable()
  recipe?: Recipe[];

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.consumption)
  @JoinColumn()
  user?: User;
}

export default Consumption;
