import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';

@Module({
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
