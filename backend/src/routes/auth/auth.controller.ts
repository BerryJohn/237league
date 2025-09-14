import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('steam')
  @UseGuards(AuthGuard('steam'))
  async steamLogin() {
    // steam redirect
  }

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  steamLoginCallback(@Req() req: any, @Res() res: Response) {
    const user = req.user;

    res.redirect(`http://localhost:3000/?auth=success&steamId=${user.id}`);
  }
}
