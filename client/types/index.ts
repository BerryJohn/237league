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
