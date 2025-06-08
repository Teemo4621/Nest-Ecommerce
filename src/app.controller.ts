import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health-check')
  healthCheck() {
    return {
      name: 'ZDV ECOMMERCE STORE',
      hp: '100/100 💖',
      mana: '100/100 💪',
    };
  }
}
