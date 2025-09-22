import { Race } from '@shared/types';
import { IsDateString, IsString } from 'class-validator';

export class CreateRaceDto implements Partial<Race> {
  @IsString()
  name: string;

  @IsString()
  trackName: string;

  @IsString()
  description: string | null;

  @IsDateString()
  raceDate: string;

  @IsString()
  seasonId: string | null;

  @IsString()
  game: string | null;
}

export class UpdateRaceDto implements Partial<Race> {
  @IsString()
  name?: string;

  @IsString()
  trackName?: string;

  @IsString()
  description?: string | null;

  @IsDateString()
  raceDate?: string;

  @IsString()
  seasonId?: string | null;

  @IsString()
  game?: string | null;
}
