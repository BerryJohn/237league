export type User<T = string> = {
  id?: string;
  steamId: string;
  displayName: string;
  avatar: string;
  personaName: string;
  steamProfileUrl: string;
  avatarHash: string;
  createdAt: T;

  country?: string;
  name?: string;
  surname?: string;
  email?: string;
  preferredStartNumber?: string;

  isAdmin?: boolean;
};

export interface League<T = string> {
  id: string;
  name: string;
  description?: string;
  createdAt: T;
  game: string;
  seasons?: Season[];
}

export interface Season<T = string> {
  id: string;
  name: string;
  isFinished: boolean;
  startDate?: T; // ISO string or Date
  endDate?: T; // ISO string or Date
  createdAt: T; // ISO string or Date
  leagueId: string;
  races?: Race[];
  status: 'upcoming' | 'ongoing' | 'finished' | 'cancelled';
}

export interface Race<T = string> {
  id: string;
  name: string;
  trackName: string;
  description: string | null;
  raceDate: T;
  createdAt: T;
  seasonId: string | null;
  results?: RaceResult[];
  game: string | null;
}

export interface RaceResult<T = string> {
  id: string;
  userId: string;
  raceId: string;
  position?: number;
  status?: string;
  points: number;
  bestLapTimeMs?: number;
  totalRaceTimeMs?: number;
  isDisqualified: boolean;
  notes?: string;
  createdAt: T;
}
