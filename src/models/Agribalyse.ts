import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export default class Agribalyse {
  @Field()
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
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
}
