import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";

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
}
