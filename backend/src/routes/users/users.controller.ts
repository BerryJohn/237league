import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { type JwtPayload } from 'src/interfaces/user.interface';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async findMe(@User() user: JwtPayload) {
    const userId = user?.sub;

    if (!userId) {
      throw new NotFoundException('User ID not found');
    }

    const me = await this.usersService.findBySteamId(userId);

    if (!me) {
      throw new NotFoundException('User not found in database');
    }

    return me;
  }

  @Get(':steamId')
  async findBySteamId(@Param('steamId') steamId: string) {
    const user = await this.usersService.findBySteamId(steamId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
