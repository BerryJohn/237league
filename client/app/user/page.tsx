'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserProfile, UserStats, EditableUserData } from '@/types';
import { UserProfileHeader } from '@/components/user/user-profile-header';
import { UserStatsCard } from '@/components/user/user-stats-card';
import { RecentRacesCard } from '@/components/user/recent-races-card';
import { EditProfileForm } from '@/components/user/edit-profile-form';
import { title } from '@/components/primitives';

export default function UserPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For demo purposes, we'll determine if it's the user's own profile
  // In a real app, this would be determined by checking authentication
  const isOwnProfile = !userId; // If no userId in URL, assume it's the user's own profile

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
        id: userId || 'current-user',
        steamId: '76561198123456789',
        username: userId ? `user_${userId}` : 'current_user',
        displayName: userId ? `Player ${userId}` : 'Your Display Name',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: isOwnProfile ? 'your.email@example.com' : undefined,
        bio: 'Passionate typeracer who loves fast typing and clean code. Always looking to improve my WPM and accuracy!',
        country: 'United States',
        isOnline: userId === '123' ? false : true,
        lastSeen: new Date(Date.now() - (userId === '123' ? 1800000 : 300000)), // 30min ago for user 123, 5min ago for others
        createdAt: new Date('2024-01-15'),
        steamProfile: {
          profileUrl: `https://steamcommunity.com/id/${userId || 'current_user'}`,
          realName: isOwnProfile ? 'John Doe' : undefined,
          country: 'United States',
        },
      };

      const mockStats: UserStats = {
        totalRaces: userId === '123' ? 1247 : 856,
        bestWpm: userId === '123' ? 142 : 98,
        averageWpm: userId === '123' ? 87 : 72,
        accuracy: userId === '123' ? 96.8 : 94.2,
        totalTimeSpent: userId === '123' ? 2890 : 1650, // minutes
        rank: userId === '123' ? 42 : 1205,
        points: userId === '123' ? 15420 : 8930,
        achievements: [
          {
            id: '1',
            name: '100 WPM Club',
            description: 'Achieved 100+ WPM in a race',
            icon: '🚀',
            unlockedAt: new Date('2024-08-15'),
            rarity: 'epic' as const,
          },
          {
            id: '2',
            name: 'Marathon Racer',
            description: 'Completed 1000 races',
            icon: '🏃‍♂️',
            unlockedAt: new Date('2024-09-01'),
            rarity: 'legendary' as const,
          },
          {
            id: '3',
            name: 'Perfect Accuracy',
            description: 'Achieved 100% accuracy in a race',
            icon: '🎯',
            unlockedAt: new Date('2024-07-22'),
            rarity: 'rare' as const,
          },
        ],
        recentRaces: [
          {
            id: '1',
            wpm: 94,
            accuracy: 97.2,
            position: 3,
            totalParticipants: 12,
            createdAt: new Date(Date.now() - 3600000), // 1 hour ago
            textId: 'text_1',
            textPreview:
              'The quick brown fox jumps over the lazy dog. This pangram contains every letter...',
          },
          {
            id: '2',
            wpm: 89,
            accuracy: 95.8,
            position: 5,
            totalParticipants: 8,
            createdAt: new Date(Date.now() - 7200000), // 2 hours ago
            textId: 'text_2',
            textPreview:
              'In the world of programming, clean code is not just a luxury but a necessity...',
          },
          {
            id: '3',
            wpm: 102,
            accuracy: 98.1,
            position: 1,
            totalParticipants: 15,
            createdAt: new Date(Date.now() - 10800000), // 3 hours ago
            textId: 'text_3',
            textPreview:
              'TypeScript is a programming language developed by Microsoft that builds on JavaScript...',
          },
        ],
      };

      setProfile(mockProfile);
      setStats(mockStats);
    } catch (err) {
      setError('Failed to load user data. Please try again.');
      console.error('Error loading user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async (data: EditableUserData) => {
    setIsSaving(true);

    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update the profile with new data
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              displayName: data.displayName,
              bio: data.bio,
              email: data.email,
              country: data.country,
            }
          : null
      );

      setIsEditing(false);

      // You might want to show a success toast here
      console.log('Profile updated successfully');
    } catch (err) {
      console.error('Failed to save profile:', err);
      // You might want to show an error toast here
      throw err; // Re-throw to let the form handle it
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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
          <div className="text-4xl">😞</div>
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-default-500">{error || 'User not found'}</p>
          <button
            onClick={loadUserData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isEditing && isOwnProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EditProfileForm
          profile={profile}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
          isLoading={isSaving}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className={title({ size: 'lg' })}>
          {isOwnProfile ? 'Your Profile' : `${profile.displayName}'s Profile`}
        </h1>
        <p className="text-default-600">
          {isOwnProfile
            ? 'Track your progress and manage your profile settings'
            : `View ${profile.displayName}'s racing statistics and achievements`}
        </p>
      </div>

      {/* Profile Header */}
      <UserProfileHeader
        profile={profile}
        isOwnProfile={isOwnProfile}
        onEditClick={handleEditProfile}
      />

      {/* Stats Section */}
      <UserStatsCard stats={stats} />

      {/* Recent Races */}
      <RecentRacesCard races={stats.recentRaces} />
    </div>
  );
}
