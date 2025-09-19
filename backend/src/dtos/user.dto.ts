import { IsString, IsOptional, IsUrl, Length, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  steamId: string;

  @IsString()
  @Length(1, 100)
  displayName: string;

  @IsString()
  avatar: string;

  @IsString()
  @Length(1, 100)
  personaName: string;

  @IsString()
  @IsUrl()
  steamProfileUrl: string;

  @IsString()
  avatarHash: string;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  country: string;
}

export class UpdateUserDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  @Length(2, 100)
  surname: string;

  @IsString()
  @Length(2, 2)
  country: string;

  @IsString()
  preferredStartNumber: string;

  @IsOptional()
  @IsString()
  email: string;
}

// {
//     "id": "4a88b467-eddc-421a-9b77-ba63db36523e",
//     "steamId": "76561198034682439",
//     "displayName": "Wekyc",
//     "avatar": "https://avatars.steamstatic.com/bd7faa873307f1a04616810a9a202a2e69b5f814.jpg",
//     "communityVisibilityState": 3,
//     "profileState": 1,
//     "personaName": "Wekyc",
//     "commentPermission": 1,
//     "profileUrl": "https://steamcommunity.com/id/Wekyc/",
//     "avatarMedium": "https://avatars.steamstatic.com/bd7faa873307f1a04616810a9a202a2e69b5f814_medium.jpg",
//     "avatarFull": "https://avatars.steamstatic.com/bd7faa873307f1a04616810a9a202a2e69b5f814_full.jpg",
//     "avatarHash": "bd7faa873307f1a04616810a9a202a2e69b5f814",
//     "lastLogoff": 1758189957,
//     "personaState": 1,
//     "realName": "Juano Pablito",
//     "primaryClanId": "103582791455292672",
//     "timeCreated": 1291730198,
//     "personaStateFlags": 0,
//     "locCountryCode": "FI"
// }
