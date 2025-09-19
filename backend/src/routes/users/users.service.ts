import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';
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

  async createUser(steamProfile: SteamUserData) {
    const userData: CreateUserDto = {
      steamId: steamProfile.id,
      displayName: steamProfile.displayName,
      avatar: steamProfile._json?.avatar || '',
      personaName: steamProfile._json?.personaname || 'Unknown User',
      steamProfileUrl: steamProfile._json?.profileurl || '',
      avatarHash: steamProfile._json?.avatarhash || '',
      createdAt: new Date(),
      country: steamProfile._json?.loccountrycode || 'PL',
    };

    return this.create(userData);
  }

  async updateUser(steamId: string, updateData: Partial<UpdateUserDto>) {
    return this.prisma.user.update({
      where: { steamId },
      data: updateData,
    });
  }
}
