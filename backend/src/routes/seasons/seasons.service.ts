import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSeasonDto, UpdateSeasonDto } from 'src/dtos/seasons.dto';

@Injectable()
export class SeasonsService {
  constructor(private prisma: PrismaService) {}

  async getAllSeasons() {
    return this.prisma.season.findMany();
  }

  async createSeason(data: CreateSeasonDto) {
    return this.prisma.season.create({ data });
  }

  async deleteSeason(id: string) {
    return this.prisma.season.delete({ where: { id } });
  }

  async updateSeason(id: string, data: UpdateSeasonDto) {
    return this.prisma.season.update({ where: { id }, data });
  }
}
