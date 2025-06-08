import { UsersService } from './../users/user.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string) {
    if (await this.usersService.findByUsername(username)) {
      throw new ConflictException('Username already exists');
    }

    if (await this.usersService.findByEmail(email)) {
      throw new ConflictException('Email already exists');
    }

    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = await this.usersService.create(username, email, hashed);
      return user;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login(user: User, res: Response) {
    const accessTokenExpirationTime =
      this.config.get<number>('jwt.accessTokenExpirationHours') || 1;

    const refreshTokenExpirationTime =
      this.config.get<number>('jwt.refreshTokenExpirationHours') || 48;

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('jwt.accessTokenSecret'),
      expiresIn: `${accessTokenExpirationTime}h`,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('jwt.refreshTokenSecret'),
      expiresIn: `${refreshTokenExpirationTime}h`,
    });

    user.refreshToken = refreshToken;
    await this.usersService.save(user);

    res.cookie('access_token', accessToken, {
      httpOnly: false,
      maxAge: accessTokenExpirationTime * 60 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenExpirationTime * 60 * 60 * 1000,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyUserRefreshToken(refToken: string, userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.refreshToken) {
      throw new UnauthorizedException();
    }

    const isMatch = refToken === user.refreshToken;
    if (!isMatch) {
      console.log('Refresh token does not match');
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...rest } = user;

    return rest;
  }

  async verifyUser(username: string, pass: string) {
    try {
      const user = await this.usersService.findByUsername(username);
      if (!user) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, refreshToken, ...rest } = user;
      return rest;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
