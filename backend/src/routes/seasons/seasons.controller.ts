import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('seasons')
export class SeasonsController {
  @Get()
  getSeasons() {}

  @UseGuards(AdminGuard)
  @Post()
  createSeason() {}

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteSeason() {}

  @UseGuards(AdminGuard)
  @Put(':id')
  updateSeason() {}
}
