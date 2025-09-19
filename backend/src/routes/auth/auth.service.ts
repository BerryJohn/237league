import { Injectable } from '@nestjs/common';
import { TokenService } from './../../services/token.service';
import { User } from './../../interfaces/user.interface';
import { UsersService } from './../users/users.service';
import { SteamUserData } from 'src/interfaces/steam-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async findUser(steamProfile: SteamUserData) {
    // Use the users service to find user in database
    return this.usersService.findBySteamId(steamProfile.id);
  }

  async createUser(steamProfile: SteamUserData) {
    // Use the users service to create a new user
    return this.usersService.createUser(steamProfile);
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
