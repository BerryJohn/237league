import { Season } from '.';

export interface League {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  game: string;
  seasons?: Season[];
}
