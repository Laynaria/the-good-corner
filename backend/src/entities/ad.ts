import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column({ length: 100 })
  owner: string;

  @Column()
  price: number;

  @Column({ length: 100 })
  picture: string;

  @Column({ length: 100 })
  location: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToMany(() => Tag, {
    cascade: ["insert"],
  })
  @JoinTable()
  tags: Tag[];
}
