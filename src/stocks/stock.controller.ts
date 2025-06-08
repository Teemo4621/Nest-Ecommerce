import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create.dto';
import { StockService } from './stock.service';
import { ResponseService } from 'src/common/services/response.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enum/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UpdateStockDto } from './dto/update.dto';

@Controller('stocks')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createStockDto: CreateStockDto) {
    if (!createStockDto.product_id || !createStockDto.codes) {
      return this.responseService.BadRequestResponse('Missing required fields');
    }
    try {
      const stock = await this.stockService.create(createStockDto);
      return this.responseService.OkResponse(stock);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Stock not created');
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const stocks = await this.stockService.findAll();
      return this.responseService.OkResponse(stocks);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Stocks not found');
    }
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      const stock = await this.stockService.findOne(+id);
      if (!stock) {
        return this.responseService.BadRequestResponse('Stock not found');
      }
      return this.responseService.OkResponse(stock);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Stock not found');
    }
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    try {
      const stock = await this.stockService.findOne(+id);
      if (!stock) {
        return this.responseService.BadRequestResponse('Stock not found');
      }
      Object.assign(stock, updateStockDto);
      return this.stockService.update(+id, stock);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Stock not updated');
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      return this.stockService.delete(+id);
    } catch (error) {
      console.log(error);
      return this.responseService.BadRequestResponse('Stock not deleted');
    }
  }
}
