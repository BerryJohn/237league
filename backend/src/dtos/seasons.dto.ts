import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateSeasonDto {
  @IsString()
  name: string;

  @IsString()
  leagueId: string;
}

export class UpdateSeasonDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isFinished?: boolean;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  leagueId?: string;
}
