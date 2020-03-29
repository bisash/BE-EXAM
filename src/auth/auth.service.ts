import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY =
    '6qXGyY8hAXuZW18keXLhFEHzfAzGOaQZlenRcVDeHlaJbW12NbK663BoQ6V79HhoKDa20m4NNN2NiX5/HXadR6nCNHoKhAemSXgbyc9vUZgl5tcc6hNUtupUoli+rMp7yQIfzZZLckHWlPdFuP/0XOjcLMBiOPJduYiD2+s32gBd0L8l8hvnu2SmJkyjLJDLfDBPGpamYWobe8gua07XVvbEl7TW92giUcH+eXcIDuksGZg0m67LdFqFtY40pNL+epZEwfWKsH+kgV8/XJ7SXECfIhb+u7ua2U6lvLBJBpUrraBYIi1xO+ivdFX1OWTUNC9ejJDmDgAdjpINfzJQsg==';

  constructor() {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      const payload = {
        thirdPartyId,
        provider,
      };
      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
