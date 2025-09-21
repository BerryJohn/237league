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
import { LeagueService } from './league.service';
import { CreateLeagueDto } from 'src/dtos/leagues.dto';

@Controller('leagues')
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  @Get()
  getLeagues() {
    return this.leagueService.getAllLeagues();
  }

  @Post()
  @UseGuards(AdminGuard)
  createLeague(@Body() body: CreateLeagueDto) {
    return this.leagueService.createLeague(body);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateLeague(
    @Param('id') id: string,
    @Body() body: Partial<CreateLeagueDto>,
  ) {
    return this.leagueService.updateLeague(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteLeague(@Param('id') id: string) {
    return this.leagueService.deleteLeague(id);
  }
}
