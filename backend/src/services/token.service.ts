import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, JwtPayload } from '../interfaces/user.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      displayName: user.displayName,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '24h',
      secret: this.configService.get<string>('JWT_SECRET', 'your-secret-key'),
    });
  }

  generateRefreshToken(user: User): string {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get<string>(
        'JWT_REFRESH_SECRET',
        'your-refresh-secret',
      ),
    });
  }

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET', 'your-secret-key'),
      }) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string): { sub: string } | null {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>(
          'JWT_REFRESH_SECRET',
          'your-refresh-secret',
        ),
      }) as { sub: string };
    } catch (error) {
      return null;
    }
  }
}
