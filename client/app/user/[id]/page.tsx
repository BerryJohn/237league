'use client';

import { useParams } from 'next/navigation';
import { UserProfile } from './../components/user-profile';
import { useAuth } from '@/contexts/auth-context';
import { useMemo } from 'react';

export default function UserIdPage() {
  const params = useParams<{ id: string }>();

  const { user } = useAuth();

  const isOwnProfile = useMemo(
    () => user?.steamId === params.id,
    [user?.steamId, params.id]
  );

  // This page shows another user's profile based on their Steam ID
  return <UserProfile steamId={params.id} isOwnProfile={isOwnProfile} />;
}
