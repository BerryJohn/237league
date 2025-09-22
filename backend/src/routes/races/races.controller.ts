import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto, UpdateRaceDto } from 'src/dtos/races.dto';

@Controller('races')
export class RacesController {
  constructor(private racesService: RacesService) {}

  @Get()
  getRaces() {
    return this.racesService.getAllRaces();
  }

  @Get(':id')
  getRaceById(@Param('id') id: string) {
    return this.racesService.getRaceById(id);
  }

  @Post()
  createRace(@Body() createRaceDto: CreateRaceDto) {
    return this.racesService.createRace(createRaceDto);
  }

  @Delete(':id')
  deleteRace(@Param('id') id: string) {
    return this.racesService.deleteRace(id);
  }

  @Put(':id')
  updateRace(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.racesService.updateRace(id, updateRaceDto);
  }
}
