export interface User {
  id?: string;
  steamId: string;
  displayName: string;
  avatar: string;
  personaName: string;
  steamProfileUrl: string;
  avatarHash: string;
  createdAt: Date;
  email?: string | null;

  name?: string | null;
  surname?: string | null;
  country?: string | null;
  preferredStartNumber?: string | null;
}

export interface JwtPayload {
  sub: string; // Steam ID
  displayName: string;
  personaName: string;
  iat?: number;
  exp?: number;
}
