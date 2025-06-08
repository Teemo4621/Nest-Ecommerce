import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create.dto';
import { CategoryService } from '../categories/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll() {
    return this.repo.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['category'] });
  }

  async create(product: CreateProductDto) {
    const category = await this.categoryService.findOne(product.category_id);
    if (!category) {
      throw new Error('Category not found');
    }
    const newProduct = new Product();
    Object.assign(newProduct, product);
    newProduct.category = category;

    return this.repo.save(newProduct);
  }

  async update(id: number, product: CreateProductDto) {
    const updatedProduct = await this.repo.preload({
      id,
      ...product,
    });
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    const category = await this.categoryService.findOne(product.category_id);
    if (!category) {
      throw new Error('Category not found');
    }
    updatedProduct.category = category;
    return this.repo.save(updatedProduct);
  }

  async delete(id: number) {
    await this.repo.delete(id);
  }
}
