import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async create(category: CreateCategoryDto) {
    return this.categoryRepository.save(category);
  }

  async update(id: number, category: Category) {
    return this.categoryRepository.update(id, category);
  }

  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new Error('Category not found');
    }
    await this.categoryRepository.delete(id);
  }
}
