import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeasonsService {
  constructor(private prisma: PrismaService) {}

  async getAllSeasons() {
    return this.prisma.season.findMany();
  }

  async createSeason(data: any) {
    return this.prisma.season.create({ data });
  }

  async deleteSeason(id: string) {
    return this.prisma.season.delete({ where: { id } });
  }
}
