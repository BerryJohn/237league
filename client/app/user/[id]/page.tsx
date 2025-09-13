'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { UserProfile, UserStats, EditableUserData } from '@/types';
import { UserProfileHeader } from '@/components/user/user-profile-header';
import { UserStatsCard } from '@/components/user/user-stats-card';
import { RecentRacesCard } from '@/components/user/recent-races-card';
import { EditProfileForm } from '@/components/user/edit-profile-form';
import { title } from '@/components/primitives';

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, you would check if this is the current user's profile
  const isOwnProfile = false; // Since this is the [id] route, it's always another user's profile

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with actual API responses
      const mockProfile: UserProfile = {
        id: userId,
        steamId: '76561198987654321',
        username: `user_${userId}`,
        displayName: `Player ${userId}`,
        avatar: `https://images.unsplash.com/photo-${userId === '123' ? '1507003211169-0a1dd7228f2d' : '1472099645785-5658abf4ff4e'}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
        bio:
          userId === '123'
            ? 'Speed demon with a love for competitive typing. Currently grinding to break into the top 10!'
            : 'Casual typeracer who enjoys improving little by little each day. Always friendly!',
        country: userId === '123' ? 'Germany' : 'Canada',
        isOnline: userId === '123' ? false : true,
        lastSeen: new Date(Date.now() - (userId === '123' ? 1800000 : 300000)), // Different last seen times
        createdAt: new Date(userId === '123' ? '2023-11-20' : '2024-03-10'),
        steamProfile: {
          profileUrl: `https://steamcommunity.com/id/user_${userId}`,
          realName: undefined, // Other users' real names are private
          country: userId === '123' ? 'Germany' : 'Canada',
        },
      };

      const mockStats: UserStats = {
        totalRaces: userId === '123' ? 2156 : 456,
        bestWpm: userId === '123' ? 156 : 87,
        averageWpm: userId === '123' ? 94 : 68,
        accuracy: userId === '123' ? 97.8 : 92.4,
        totalTimeSpent: userId === '123' ? 4520 : 890, // minutes
        rank: userId === '123' ? 15 : 2847,
        points: userId === '123' ? 28450 : 5620,
        achievements:
          userId === '123'
            ? [
                {
                  id: '1',
                  name: 'Speed Legend',
                  description: 'Achieved 150+ WPM in a race',
                  icon: '⚡',
                  unlockedAt: new Date('2024-06-20'),
                  rarity: 'legendary' as const,
                },
                {
                  id: '2',
                  name: 'Elite Racer',
                  description: 'Reached top 50 global ranking',
                  icon: '👑',
                  unlockedAt: new Date('2024-08-10'),
                  rarity: 'legendary' as const,
                },
                {
                  id: '3',
                  name: 'Marathon Master',
                  description: 'Completed 2000+ races',
                  icon: '🏁',
                  unlockedAt: new Date('2024-09-05'),
                  rarity: 'epic' as const,
                },
              ]
            : [
                {
                  id: '1',
                  name: 'First Steps',
                  description: 'Completed your first race',
                  icon: '🏃‍♂️',
                  unlockedAt: new Date('2024-03-11'),
                  rarity: 'common' as const,
                },
                {
                  id: '2',
                  name: 'Consistency',
                  description: 'Completed 100 races',
                  icon: '🎯',
                  unlockedAt: new Date('2024-07-15'),
                  rarity: 'rare' as const,
                },
              ],
        recentRaces: [
          {
            id: '1',
            wpm: userId === '123' ? 148 : 82,
            accuracy: userId === '123' ? 98.5 : 94.1,
            position: userId === '123' ? 1 : 4,
            totalParticipants: 18,
            createdAt: new Date(Date.now() - 1800000), // 30 min ago
            textId: 'text_1',
            textPreview:
              'Advanced algorithms and data structures form the backbone of efficient software...',
          },
          {
            id: '2',
            wpm: userId === '123' ? 142 : 79,
            accuracy: userId === '123' ? 97.2 : 91.8,
            position: userId === '123' ? 2 : 6,
            totalParticipants: 12,
            createdAt: new Date(Date.now() - 3600000), // 1 hour ago
            textId: 'text_2',
            textPreview:
              'The evolution of programming languages reflects the changing needs of developers...',
          },
        ],
      };

      setProfile(mockProfile);
      setStats(mockStats);
    } catch (err) {
      setError(
        'Failed to load user profile. The user might not exist or there was a connection error.'
      );
      console.error('Error loading user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-default-500">Loading user profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile || !stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="text-4xl">🔍</div>
          <h2 className="text-2xl font-bold">User Not Found</h2>
          <p className="text-default-500">
            {error || 'The requested user profile could not be found.'}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className={title({ size: 'lg' })}>
          {profile.displayName}&apos;s Profile
        </h1>
        <p className="text-default-600">
          View {profile.displayName}&apos;s racing statistics and achievements
        </p>
      </div>

      {/* Profile Header */}
      <UserProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      {/* Stats Section */}
      <UserStatsCard stats={stats} />

      {/* Recent Races */}
      <RecentRacesCard races={stats.recentRaces} />
    </div>
  );
}
