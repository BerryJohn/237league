import { IsString, IsInt, IsOptional, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  steamId: string;

  @IsString()
  @Length(1, 100)
  displayName: string;

  @IsString()
  avatar: string;

  @IsInt()
  communityVisibilityState: number;

  @IsInt()
  profileState: number;

  @IsString()
  @Length(1, 100)
  personaName: string;

  @IsInt()
  commentPermission: number;

  @IsString()
  @IsUrl()
  profileUrl: string;

  @IsString()
  avatarMedium: string;

  @IsString()
  avatarFull: string;

  @IsString()
  avatarHash: string;

  @IsInt()
  lastLogoff: number;

  @IsInt()
  personaState: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  realName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  primaryClanId?: string;

  @IsInt()
  timeCreated: number;

  @IsInt()
  personaStateFlags: number;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  locCountryCode?: string;
}
