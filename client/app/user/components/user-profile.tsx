'use client';

import { useMemo } from 'react';
import { UserProfileHeader } from './user-profile-header';
import { useApi, userApi } from '@/api';
import { userDataType } from '@/types/user';

interface UserProfileProps {
  steamId?: string; // If provided, fetch user by steamId, otherwise fetch current user
  isOwnProfile?: boolean; // Override for own profile detection
}

export function UserProfile({ steamId, isOwnProfile }: UserProfileProps) {
  // Determine if this is the user's own profile
  const isOwn = useMemo(() => {
    return isOwnProfile ?? !steamId;
  }, [steamId, isOwnProfile]);

  // Choose the appropriate API function based on whether steamId is provided
  const apiFn = useMemo(() => {
    return steamId
      ? () => userApi.getUserBySteamId(steamId)
      : userApi.getCurrentUser;
  }, [steamId]);

  const {
    data: userData,
    isLoading,
    error,
    isError,
    isSuccess,
    refetch,
  } = useApi<userDataType>(apiFn, {
    onSuccess: (data) => {
      console.log('User data loaded:', data);
    },
    onError: (error) => {
      console.error('Error fetching user data:', error);
    },
  });

  if (isLoading || (!isSuccess && !isError)) {
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

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="text-4xl">😞</div>
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-default-500">
            {error ? String(error) : 'Failed to load user profile'}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="text-4xl">😞</div>
          <h2 className="text-2xl font-bold">User not found</h2>
          <p className="text-default-500">
            The user profile you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <UserProfileHeader profile={userData} isOwnProfile={isOwn} />
    </div>
  );
}
