import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(private readonly configService: ConfigService) {
    const port = configService.get('PORT', 6969);

    const apiKey = configService.get('STEAM_API_KEY');

    if (!apiKey) {
      throw new Error('STEAM_API_KEY is not set in environment variables');
    }

    super({
      returnURL: `http://localhost:${port}/auth/steam/return`,
      realm: `http://localhost:${port}/`,
      apiKey: apiKey,
    });
  }

  async validate(identifier: string, profile: any, done: Function) {
    done(null, profile);
  }
}
