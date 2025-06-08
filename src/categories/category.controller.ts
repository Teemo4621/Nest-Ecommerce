import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { ResponseService } from 'src/common/services/response.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enum/role.enum';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async create(@Body() category: CreateCategoryDto) {
    if (!category.name || !category.image) {
      return this.responseService.BadRequestResponse('Missing required fields');
    }
    try {
      const newCategory = await this.categoryService.create({
        name: category.name,
        image: category.image,
      });
      return this.responseService.OkResponse(newCategory);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Category not created');
    }
  }

  @Get()
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      return this.responseService.OkResponse(categories);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Categories not found');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoryService.findOne(+id);
      if (!category) {
        return this.responseService.BadRequestResponse('Category not found');
      }

      return this.responseService.OkResponse(category);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Category not found');
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      await this.categoryService.remove(+id);
      return this.responseService.OkResponse('Category deleted successfully');
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Category not found');
    }
  }
}
