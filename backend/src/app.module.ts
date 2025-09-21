import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './routes/events/events.module';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';
import { SeasonsModule } from './routes/seasons/seasons.module';
import { LeaguesModule } from './routes/leagues/leagues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventModule,
    AuthModule,
    UsersModule,
    LeaguesModule,
    SeasonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
