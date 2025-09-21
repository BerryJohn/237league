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
import { AdminGuard } from 'src/guards/admin.guard';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto, UpdateSeasonDto } from 'src/dtos/seasons.dto';

@Controller('seasons')
export class SeasonsController {
  constructor(private seasonService: SeasonsService) {}

  @Get()
  getSeasons() {
    return this.seasonService.getAllSeasons();
  }

  @Post()
  @UseGuards(AdminGuard)
  createSeason(@Body() body: CreateSeasonDto) {
    return this.seasonService.createSeason(body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteSeason(@Param('id') id: string) {
    return this.seasonService.deleteSeason(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  updateSeason(@Param('id') id: string, @Body() body: UpdateSeasonDto) {
    return this.seasonService.updateSeason(id, body);
  }
}
