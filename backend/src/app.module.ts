import { Module } from '@nestjs/common';
import { EventModule } from './routes/events/events.module';

@Module({
  imports: [EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
