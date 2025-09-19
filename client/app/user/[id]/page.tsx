'use client';

import { useParams } from 'next/navigation';
import { UserProfile } from '@/components/user/user-profile';
import { useAuth } from '@/contexts/auth-context';

export default function UserIdPage() {
  const params = useParams<{ id: string }>();

  const { user } = useAuth();

  if (user && user.id === params.id) {
    window.location.href = '/user';
    return null; // Prevent rendering anything while redirecting
  }

  // This page shows another user's profile based on their Steam ID
  return <UserProfile steamId={params.id} isOwnProfile={false} />;
}
