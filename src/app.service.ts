import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to ZDV ECOMMERCE STORE API v1.0.0';
  }
}
