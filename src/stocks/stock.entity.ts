import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.stocks)
  product: Product;

  @Column()
  code: string; // เช่น รหัส key เกม

  @Column({ default: false })
  isSold: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
