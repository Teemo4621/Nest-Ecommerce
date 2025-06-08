import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TokenPayload } from '../jwt.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt_refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = (request.cookies as Record<string, string | undefined>)
            ?.refresh_token;
          return token ?? null;
        },
      ]),
      secretOrKey: configService.getOrThrow('jwt.refreshTokenSecret'),
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refToken = (request.cookies as Record<string, string | undefined>)
      ?.refresh_token;

    if (!refToken) {
      throw new UnauthorizedException();
    }

    return this.authService.verifyUserRefreshToken(refToken, payload.id);
  }
}
