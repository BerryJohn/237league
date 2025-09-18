import { Injectable } from '@nestjs/common';
import { TokenService } from '../../services/token.service';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class AuthService {
  // In-memory user store (replace with database later)
  private users: Map<string, User> = new Map();

  constructor(private readonly tokenService: TokenService) {}

  async findOrCreateUser(steamProfile: any): Promise<User> {
    const steamId = steamProfile.id;

    // Check if user already exists
    if (this.users.has(steamId)) {
      return this.users.get(steamId)!;
    }

    // Create new user from Steam profile
    const user: User = {
      id: steamId,
      displayName:
        steamProfile.displayName ||
        steamProfile._json?.personaname ||
        'Unknown',
      username:
        steamProfile.username || steamProfile._json?.personaname || steamId,
      profileUrl: steamProfile._json?.profileurl || '',
      avatar: {
        small:
          steamProfile.photos?.[0]?.value || steamProfile._json?.avatar || '',
        medium:
          steamProfile.photos?.[1]?.value ||
          steamProfile._json?.avatarmedium ||
          '',
        large:
          steamProfile.photos?.[2]?.value ||
          steamProfile._json?.avatarfull ||
          '',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store user (in production, save to database)
    this.users.set(steamId, user);

    return user;
  }

  async loginUser(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async validateUser(steamId: string): Promise<User | null> {
    return this.users.get(steamId) || null;
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const payload = this.tokenService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return null;
    }

    const user = await this.validateUser(payload.sub);
    if (!user) {
      return null;
    }

    return {
      accessToken: this.tokenService.generateAccessToken(user),
      refreshToken: this.tokenService.generateRefreshToken(user),
    };
  }
}
