import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { type JwtPayload } from 'src/interfaces/user.interface';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { userData } from 'src/interfaces/steam-user.interface';
import { UpdateUserDto } from 'src/dtos/user.dto';

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

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @User() user: JwtPayload,
    @Body() body: Partial<UpdateUserDto>,
  ) {
    const userId = user?.sub;

    if (!userId) {
      throw new NotFoundException('User ID not found');
    }

    const updatedUser = await this.usersService.updateUser(userId, body);

    return updatedUser;
  }
}
