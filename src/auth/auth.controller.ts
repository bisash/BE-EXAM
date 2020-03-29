import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (!jwt) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json({ token: jwt });
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
