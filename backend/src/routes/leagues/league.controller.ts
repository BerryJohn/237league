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
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from 'src/dtos/leagues.dto';

@Controller('leagues')
export class LeaguesController {
  constructor(private leaguesService: LeaguesService) {}

  @Get()
  getLeagues() {
    return this.leaguesService.getAllLeagues();
  }

  @Post()
  @UseGuards(AdminGuard)
  createLeague(@Body() body: CreateLeagueDto) {
    return this.leaguesService.createLeague(body);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateLeague(
    @Param('id') id: string,
    @Body() body: Partial<CreateLeagueDto>,
  ) {
    return this.leaguesService.updateLeague(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteLeague(@Param('id') id: string) {
    return this.leaguesService.deleteLeague(id);
  }
}
