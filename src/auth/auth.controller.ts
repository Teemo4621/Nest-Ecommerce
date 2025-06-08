import { Controller, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { CurrentUser } from './decorators/current_user.decorator';
import { User } from 'src/users/user.entity';
import { ResponseService } from 'src/common/services/response.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt_refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (!body.username || !body.email || !body.password) {
      return this.responseService.BadRequestResponse('Missing required fields');
    }

    const user = await this.authService.register(
      body.username,
      body.email,
      body.password,
    );

    return this.responseService.OkResponse(user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      user,
      res,
    );
    return this.responseService.OkResponse({ accessToken, refreshToken });
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      user,
      res,
    );
    return this.responseService.OkResponse({ accessToken, refreshToken });
  }
}
