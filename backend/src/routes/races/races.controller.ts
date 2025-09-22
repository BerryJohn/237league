import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto, UpdateRaceDto } from 'src/dtos/races.dto';
import { AdminGuard } from 'src/guards/admin.guard';

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

  @UseGuards(AdminGuard)
  @Post()
  createRace(@Body() createRaceDto: CreateRaceDto) {
    return this.racesService.createRace(createRaceDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteRace(@Param('id') id: string) {
    return this.racesService.deleteRace(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateRace(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.racesService.updateRace(id, updateRaceDto);
  }
}
