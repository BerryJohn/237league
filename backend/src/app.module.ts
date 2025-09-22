import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';
import { SeasonsModule } from './routes/seasons/seasons.module';
import { LeaguesModule } from './routes/leagues/leagues.module';
import { RacesModule } from './routes/races/races.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    LeaguesModule,
    SeasonsModule,
    RacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
