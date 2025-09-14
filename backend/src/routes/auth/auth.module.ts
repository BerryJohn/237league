import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { SteamStrategy } from 'src/helpers/steam.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'steam' })],
  controllers: [AuthController],
  providers: [SteamStrategy],
})
export class AuthModule {}
