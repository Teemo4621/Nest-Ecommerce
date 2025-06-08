import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { CreateStockDto } from './dto/create.dto';
import { ProductService } from '../products/product.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly repo: Repository<Stock>,
    private readonly productService: ProductService,
  ) {}

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async create(stock: CreateStockDto) {
    const product = await this.productService.findOne(stock.product_id);
    if (!product) {
      throw new Error('Product not found');
    }
    try {
      for (const code of stock.codes) {
        const newStock = new Stock();
        Object.assign(newStock, stock);
        newStock.code = code;
        newStock.product = product;
        await this.repo.save(newStock);
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async update(id: number, stock: Stock) {
    return this.repo.update(id, stock);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
