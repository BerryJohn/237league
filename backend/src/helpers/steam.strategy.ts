import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor() {
    super({
      returnURL: `http://localhost:${process.env.PORT || 6969}/auth/steam/return`,
      realm: `http://localhost:${process.env.PORT || 6969}/`,
      apiKey: process.env.STEAM_API_KEY ?? '6969',
    });
  }

  async validate(identifier: string, profile: any, done: Function) {
    done(null, profile);
  }
}
