import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/user.service';
import { Request } from 'express';
import { TokenPayload } from '../jwt.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = (req.cookies as Record<string, string | undefined>)
            ?.access_token;
          return token || null;
        },
      ]),
      secretOrKey: config.getOrThrow('jwt.accessTokenSecret'),
      ignoreExpiration: false,
    });
  }

  validate(payload: TokenPayload) {
    return { id: payload.id, username: payload.username, role: payload.role };
  }
}
