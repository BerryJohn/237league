import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EventService } from './events.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll() {
    // Return all racing events (placeholder)
    return 'This action returns all racing events';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Return a single racing event by id (placeholder)
    return `This action returns a racing event with id ${id}`;
  }

  @Post()
  create(@Body() createEventDto: any) {
    // Create a new racing event (placeholder)
    return 'This action creates a new racing event';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: any) {
    // Update a racing event by id (placeholder)
    return `This action updates a racing event with id ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Delete a racing event by id (placeholder)
    return `This action removes a racing event with id ${id}`;
  }
}
