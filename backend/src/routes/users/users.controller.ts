import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/user.dto';
import { type JwtPayload } from 'src/interfaces/user.interface';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':steamId')
  async findBySteamId(@Param('steamId') steamId: string) {
    return this.usersService.findBySteamId(steamId);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async findMe(@User() user: JwtPayload) {
    return this.usersService.findBySteamId(user.sub);
  }
}
