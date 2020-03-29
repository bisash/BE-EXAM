import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        '614016480986-h7bromdn968pnre08hqa220rruv2j2pc.apps.googleusercontent.com',
      clientSecret: 'o42LgyGuMjEOlC6ruJj2wsRB',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: Function,
  ) {
    console.log(profile);
    try {
      const jwt: string = await this.authService.validateOAuthLogin(
        profile.id,
        Provider.GOOGLE,
      );
      const user = {
        jwt,
      };
      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
