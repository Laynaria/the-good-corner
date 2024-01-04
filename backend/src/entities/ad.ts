import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Category } from "./category";
import { Tag } from "./tag";
import { User } from "./user";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ length: 100 })
  owner: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column({ length: 100 })
  picture: string;

  @Field()
  @Column({ length: 100 })
  location: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field(() => Category)
  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => User)
  user: User;

  @Field((type) => [Tag], { nullable: true })
  @ManyToMany(() => Tag, {
    cascade: ["insert"],
  })
  @JoinTable()
  tags: Tag[];
}
