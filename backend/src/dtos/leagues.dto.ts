import { IsOptional, IsString, Length } from 'class-validator';

export class CreateLeagueDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 1000)
  description?: string;

  @IsString()
  game: string;
}

export class UpdateLeagueDto extends CreateLeagueDto {}
