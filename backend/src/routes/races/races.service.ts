import { Injectable } from '@nestjs/common';
import { Race } from '@shared/types';
import { CreateRaceDto, UpdateRaceDto } from 'src/dtos/races.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RacesService {
  constructor(private prisma: PrismaService) {}

  async createRace(data: CreateRaceDto): Promise<Race<Date>> {
    return this.prisma.race.create({ data });
  }

  async getAllRaces(): Promise<Race<Date>[]> {
    return this.prisma.race.findMany();
  }

  async getRaceById(id: string): Promise<Race<Date> | null> {
    return this.prisma.race.findUnique({ where: { id } });
  }

  async updateRace(id: string, data: UpdateRaceDto): Promise<Race<Date>> {
    return this.prisma.race.update({ where: { id }, data });
  }

  async deleteRace(id: string): Promise<Race<Date>> {
    return this.prisma.race.delete({ where: { id } });
  }
}
