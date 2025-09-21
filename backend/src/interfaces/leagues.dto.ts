export interface League {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  game: string;
  seasons?: Season[];
}

type Season = 'not ready yet';
