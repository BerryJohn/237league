// Types for racer statistics and performance data
export interface RacerStats {
  id: string;
  name: string;
  overallRating: number; // 0-100 overall skill rating
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Pro';
  suggestedSplit: 'Split 1' | 'Split 2' | 'Split 3' | 'Split 4';
  totalRaces: number;
  paceRating: number; // 0-100 pace consistency rating
  racecraftRating: number; // 0-100 racecraft/overtaking rating
  consistencyRating: number; // 0-100 consistency rating
  safetyRating: number; // 0-100 safety/clean driving rating
  bestLapTime: string;
  averageLapTime: string;
  incidentRate: number; // incidents per race
  status: 'active' | 'inactive' | 'probation';
  team?: string;
  avatar?: string;
}

export interface RacerStatsTableProps {
  racers?: RacerStats[];
  title?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
}

export type StatusType = 'active' | 'inactive' | 'probation';
export type SkillLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Expert'
  | 'Pro';
