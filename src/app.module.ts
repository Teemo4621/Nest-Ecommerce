import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';
import { ConfigService } from '@nestjs/config';
import { CategoryModule } from './categories/category.module';
import { ProductModule } from './products/product.module';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { Stock } from './stocks/stock.entity';
import { StockModule } from './stocks/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('db.host'),
        port: parseInt(config.getOrThrow('db.port') || '5432', 10),
        username: config.getOrThrow('db.user'),
        password: config.getOrThrow('db.password'),
        database: config.getOrThrow('db.name'),
        autoLoadEntities: true,
        entities: [User, Category, Product, Stock],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    CommonModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
  }
}
