import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor() {
    super({
      returnURL: `http://localhost:${process.env.PORT || 3000}/auth/steam/return`,
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY ?? 'SETUP_ME',
    });
  }

  async validate(identifier: string, profile: any, done: Function) {
    done(null, profile);
  }
}
