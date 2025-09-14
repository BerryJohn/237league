import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('steam')
  @UseGuards(AuthGuard('steam'))
  async steamLogin() {
    // steam redirect
  }

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  steamLoginCallback(@Req() req: any) {
    return {
      success: true,
      message: 'Steam authentication successful',
      user: req.user,
    };
  }
}
