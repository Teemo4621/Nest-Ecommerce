import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enum/role.enum';
import { ResponseService } from 'src/common/services/response.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productService.create(createProductDto);
      return this.responseService.OkResponse(newProduct);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Product not created');
    }
  }

  @Get()
  async findAll() {
    try {
      const products = await this.productService.findAll();
      return this.responseService.OkResponse(products);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Products not found');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findOne(+id);
      return this.responseService.OkResponse(product);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Product not found');
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      await this.productService.delete(+id);
      return this.responseService.OkResponse('Product deleted successfully');
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Product not found');
    }
  }
}
