import { Injectable } from '@nestjs/common';
import { League } from 'src/interfaces/leagues.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeaguesService {
  constructor(private prisma: PrismaService) {}

  async getAllLeagues() {
    return this.prisma.league.findMany();
  }

  async createLeague(data: any) {
    return this.prisma.league.create({ data }) as Promise<League>;
  }

  async updateLeague(id: string, data: any) {
    return this.prisma.league.update({
      where: { id },
      data,
    }) as Promise<League>;
  }

  async deleteLeague(id: string) {
    return this.prisma.league.delete({ where: { id } }) as Promise<League>;
  }
}
