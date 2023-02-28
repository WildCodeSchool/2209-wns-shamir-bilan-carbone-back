import { ObjectType, Field } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class BaseCarbone {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  _i?: string;

  @Field({ nullable: true })
  @Column()
  name?: string;

  @Field({ nullable: true })
  @Column()
  co2?: string;

  @Field({ nullable: true })
  @Column()
  unit?: string;
}
