import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), ProductModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
