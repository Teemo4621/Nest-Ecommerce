import { Controller, UseGuards, Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current_user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/user.entity';
import { ResponseService } from 'src/common/services/response.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from './enum/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly responseService: ResponseService,
  ) {}

  @Get('@me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...rest } = user;
    return this.responseService.OkResponse(rest);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getAll() {
    const users = await this.userService.findAll();

    return this.responseService.OkResponse(users);
  }
}
