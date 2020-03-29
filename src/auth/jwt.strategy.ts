import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '6qXGyY8hAXuZW18keXLhFEHzfAzGOaQZlenRcVDeHlaJbW12NbK663BoQ6V79HhoKDa20m4NNN2NiX5/HXadR6nCNHoKhAemSXgbyc9vUZgl5tcc6hNUtupUoli+rMp7yQIfzZZLckHWlPdFuP/0XOjcLMBiOPJduYiD2+s32gBd0L8l8hvnu2SmJkyjLJDLfDBPGpamYWobe8gua07XVvbEl7TW92giUcH+eXcIDuksGZg0m67LdFqFtY40pNL+epZEwfWKsH+kgV8/XJ7SXECfIhb+u7ua2U6lvLBJBpUrraBYIi1xO+ivdFX1OWTUNC9ejJDmDgAdjpINfzJQsg==',
    });
  }

  async validate(payload, done: Function) {
    try {
      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}
