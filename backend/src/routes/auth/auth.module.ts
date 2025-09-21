import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SteamStrategy } from './../../helpers/steam.strategy';
import { TokenService } from './../../services/token.service';
import { JwtAuthGuard } from './../../guards/jwt-auth.guard';
import { UsersModule } from './../users/users.module';
import { LeaguesModule } from '../leagues/leagues.module';
import { SeasonsModule } from '../seasons/seasons.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'steam' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'your-secret-key'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    ConfigModule,
    forwardRef(() => UsersModule),
    forwardRef(() => LeaguesModule),
    forwardRef(() => SeasonsModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, SteamStrategy, TokenService, JwtAuthGuard],
  exports: [AuthService, TokenService, JwtAuthGuard],
})
export class AuthModule {}
