import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/services/users.service';

const cookieExtractor = (request: Request): string | null => {
  const token: unknown = request.cookies?.access_token;
  return typeof token === 'string' ? token : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findForAuthenticationById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
