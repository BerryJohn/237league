import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('steam')
  @UseGuards(AuthGuard('steam'))
  async steamLogin() {
    // steam redirect
  }

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  async steamLoginCallback(@Req() req: any, @Res() res: Response) {
    try {
      // Find or create user from Steam profile
      const user = await this.authService.findOrCreateUser(req.user);

      // Generate JWT tokens
      const { accessToken, refreshToken } =
        await this.authService.loginUser(user);

      // Set secure HTTP-only cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const clientUrl = this.configService.get('CLIENT_URL');
      if (!clientUrl) {
        throw new Error('CLIENT_URL is not set in environment variables');
      }
      // Redirect to client with success indicator
      res.redirect(`${clientUrl}/?auth=success`);
    } catch (error) {
      const clientUrl = this.configService.get('CLIENT_URL');
      if (!clientUrl) {
        throw new Error('CLIENT_URL is not set in environment variables');
      }

      console.error('Steam login error:', error);
      res.redirect(`${clientUrl}/?auth=error`);
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req: any) {
    return req.user;
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
      }

      const tokens = await this.authService.refreshTokens(refreshToken);

      if (!tokens) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      // Set new cookies
      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ message: 'Tokens refreshed successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Token refresh failed' });
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });
  }

  @Post('login-tokens')
  @UseGuards(JwtAuthGuard)
  async getTokens(
    @Req() req: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Generate new tokens for the authenticated user
    const { accessToken, refreshToken } = await this.authService.loginUser(
      req.user,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Get('token-info')
  @UseGuards(JwtAuthGuard)
  async getTokenInfo(@Req() req: any) {
    return {
      user: req.user,
      tokenPayload: req.tokenPayload,
      isValid: true,
      expiresAt: new Date(req.tokenPayload.exp * 1000),
    };
  }
}
