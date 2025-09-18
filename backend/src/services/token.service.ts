import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, JwtPayload } from './../interfaces/user.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.steamId,
      displayName: user.displayName,
      personaName: user.personaName,
    };

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set in environment variables');
    }
    return this.jwtService.sign(payload, {
      expiresIn: '24h',
      secret: jwtSecret,
    });
  }

  generateRefreshToken(user: User): string {
    const payload = { sub: user.steamId };
    const jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!jwtRefreshSecret) {
      throw new Error('JWT_REFRESH_SECRET is not set in environment variables');
    }

    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: jwtRefreshSecret,
    });
  }

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not set in environment variables');
      }
      return this.jwtService.verify(token, {
        secret: jwtSecret,
      }) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string): { sub: string } | null {
    try {
      const jwtRefreshSecret =
        this.configService.get<string>('JWT_REFRESH_SECRET');
      if (!jwtRefreshSecret) {
        throw new Error(
          'JWT_REFRESH_SECRET is not set in environment variables',
        );
      }
      return this.jwtService.verify(token, {
        secret: jwtRefreshSecret,
      }) as { sub: string };
    } catch (error) {
      return null;
    }
  }
}
