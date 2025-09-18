export interface User {
  id: string; // Steam ID
  displayName: string;
  username: string;
  profileUrl: string;
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JwtPayload {
  sub: string; // Steam ID
  username: string;
  displayName: string;
  iat?: number;
  exp?: number;
}
