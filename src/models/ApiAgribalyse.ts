import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export default class ApiAgribalyse {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  _i?: string;

  @Field({ nullable: true })
  @Column()
  _id?: string;

  @Field({ nullable: true })
  @Column()
  name?: string;

  @Field({ nullable: true })
  @Column()
  group?: string;

  @Field({ nullable: true })
  @Column()
  subgroup?: string;

  @Field({ nullable: true })
  @Column()
  empreinte?: number;
}
