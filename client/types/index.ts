import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// User-related types
export interface UserProfile {
  id: string;
  steamId: string;
  username: string;
  displayName: string;
  avatar: string;
  email?: string;
  bio?: string;
  country?: string;
  isOnline: boolean;
  lastSeen: Date;
  createdAt: Date;
  // Steam auth fields (read-only)
  steamProfile: {
    profileUrl: string;
    realName?: string;
    country?: string;
  };
}

export interface UserStats {
  totalRaces: number;
  bestWpm: number;
  averageWpm: number;
  accuracy: number;
  totalTimeSpent: number; // in minutes
  rank: number;
  points: number;
  achievements: Achievement[];
  recentRaces: RecentRace[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface RecentRace {
  id: string;
  wpm: number;
  accuracy: number;
  position: number;
  totalParticipants: number;
  createdAt: Date;
  textId: string;
  textPreview: string;
}

export interface EditableUserData {
  displayName: string;
  bio: string;
  email: string;
  country: string;
}

export interface UserPageProps {
  userId?: string; // If provided, show another user's profile
  isOwnProfile: boolean;
}

// Event-related types for Le Mans Ultimate racing league
export interface RacingEvent {
  id: string;
  name: string;
  description: string;
  track: Track;
  eventType: 'race' | 'qualifying' | 'practice' | 'championship';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  maxParticipants: number;
  currentParticipants: number;
  weather: WeatherCondition;
  raceSettings: RaceSettings;
  participants: EventParticipant[];
  results?: RaceResult[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Track {
  id: string;
  name: string;
  location: string;
  country: string;
  length: number; // in kilometers
  corners: number;
  lapRecord?: LapRecord;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  imageUrl?: string;
  description?: string;
}

export interface LapRecord {
  time: string; // Format: "mm:ss.SSS"
  driver: string;
  car: string;
  date: Date;
}

export interface WeatherCondition {
  condition: 'sunny' | 'cloudy' | 'rain' | 'storm' | 'fog';
  temperature: number; // in Celsius
  trackTemperature: number;
  humidity: number; // percentage
  windSpeed: number; // km/h
  windDirection: string;
}

export interface RaceSettings {
  raceLength: number; // in minutes or laps
  lengthType: 'time' | 'laps';
  qualifyingLength: number; // in minutes
  practiceLength: number; // in minutes
  fuelConsumption: boolean;
  tireWear: boolean;
  damage: 'off' | 'visual' | 'full';
  assists: {
    abs: boolean;
    tractionControl: boolean;
    stabilityControl: boolean;
    autoShift: boolean;
    brakingAssist: boolean;
  };
}

export interface EventParticipant {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  carNumber: number;
  car: string;
  team?: string;
  registeredAt: Date;
  isReserve: boolean;
}

export interface RaceResult {
  position: number;
  participantId: string;
  username: string;
  displayName: string;
  car: string;
  team?: string;
  totalTime?: string; // Format: "hh:mm:ss.SSS"
  bestLap?: string; // Format: "mm:ss.SSS"
  lapsCompleted: number;
  gap: string; // Time gap to leader
  points: number;
  dnf: boolean; // Did Not Finish
  dnfReason?: string;
  penalties?: Penalty[];
}

export interface Penalty {
  type: 'time' | 'position' | 'warning' | 'disqualification';
  amount: number; // seconds for time penalty, positions for position penalty
  reason: string;
  lap: number;
}

export interface EventFilters {
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  eventType?: 'race' | 'qualifying' | 'practice' | 'championship';
  track?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Season/Championship-related types
export interface Season {
  id: string;
  name: string;
  description: string;
  year: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  totalRounds: number;
  completedRounds: number;
  pointsSystem: PointsSystem;
  categories: ChampionshipCategory[];
  standings: ChampionshipStandings[];
  rounds: SeasonRound[];
  regulations?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PointsSystem {
  id: string;
  name: string;
  positions: PointsPosition[];
  bonusPoints?: BonusPoints;
}

export interface PointsPosition {
  position: number;
  points: number;
}

export interface BonusPoints {
  fastestLap?: number;
  polePosition?: number;
  mostLapsLed?: number;
  cleanRace?: number;
}

export interface ChampionshipCategory {
  id: string;
  name: string;
  description: string;
  vehicleClass: string;
  maxParticipants?: number;
  entryRequirements?: string[];
}

export interface ChampionshipStandings {
  seasonId: string;
  categoryId: string;
  standings: DriverStanding[];
  teamStandings?: TeamStanding[];
  lastUpdated: Date;
}

export interface DriverStanding {
  position: number;
  previousPosition?: number;
  driverId: string;
  driverName: string;
  displayName: string;
  avatar?: string;
  team?: string;
  vehicle: string;
  totalPoints: number;
  roundsParticipated: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
  polePositions: number;
  dnfCount: number;
  penalties: number;
  averagePosition: number;
  bestFinish: number;
  worstFinish: number;
  pointsPerRound: number;
  form: ('W' | 'P' | 'F' | 'DNF' | number)[]; // Last 5 results
}

export interface TeamStanding {
  position: number;
  previousPosition?: number;
  teamId: string;
  teamName: string;
  drivers: string[];
  totalPoints: number;
  constructorPoints: number;
  wins: number;
  podiums: number;
  oneTwo: number; // 1-2 finishes
  dnfCount: number;
}

export interface SeasonRound {
  id: string;
  roundNumber: number;
  name: string;
  eventId: string;
  event: RacingEvent;
  seasonId: string;
  isCompleted: boolean;
  isDroppedRound?: boolean; // For seasons that drop worst results
  pointsAwarded: RoundPoints[];
  date: Date;
}

export interface RoundPoints {
  driverId: string;
  categoryId: string;
  racePoints: number;
  bonusPoints: number;
  totalPoints: number;
  penaltyPoints: number;
  finalPoints: number;
}

export interface SeasonStatistics {
  totalDrivers: number;
  totalTeams: number;
  totalRaces: number;
  completedRaces: number;
  averageParticipation: number;
  mostWins: {
    driverId: string;
    driverName: string;
    wins: number;
  };
  championshipLeader: {
    driverId: string;
    driverName: string;
    points: number;
    lead: number;
  };
  closestChampionship: number; // Points gap between 1st and 2nd
}

export interface SeasonFilters {
  year?: number;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  category?: string;
}
