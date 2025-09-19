import { Injectable } from '@nestjs/common';
import { TokenService } from './../../services/token.service';
import { User } from './../../interfaces/user.interface';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async findOrCreateUser(steamProfile: any) {
    // Use the users service to find or create user in database
    return this.usersService.findOrCreateBySteamProfile(steamProfile);
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

  async validateUser(steamId: string) {
    return this.usersService.findBySteamId(steamId);
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
