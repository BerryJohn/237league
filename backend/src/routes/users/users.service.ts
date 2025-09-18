import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user.dto';
import { SteamUserData } from 'src/interfaces/steam-user.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findBySteamId(steamId: string) {
    return this.prisma.user.findUnique({
      where: { steamId },
    });
  }

  async findOrCreateBySteamProfile(steamProfile: SteamUserData) {
    const steamId = steamProfile.id;

    const existingUser = await this.findBySteamId(steamId);
    if (existingUser) {
      return existingUser;
    }

    const userData: CreateUserDto = {
      steamId: steamProfile.id,
      displayName: steamProfile.displayName,
      avatar: steamProfile._json?.avatar || '',
      personaName: steamProfile._json?.personaname || 'Unknown User',
      steamProfileUrl: steamProfile._json?.profileurl || '',
      avatarHash: steamProfile._json?.avatarhash || '',
      createdAt: new Date(),
    };

    return this.create(userData);
  }
}
