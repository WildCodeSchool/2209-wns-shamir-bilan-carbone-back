<<<<<<< HEAD
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Column()
  hashed_password: string;

  @Column()
  role: string;
}
=======
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Column()
  hashed_password: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;
}
>>>>>>> 19cf02bfeafce979ba3f4b9748043d1bd14ec38c
