'use client';

import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { notFound } from 'next/navigation';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({
  children,
}: AdminProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to 404 if user is not authenticated or not admin
  if (!isAuthenticated || !user) {
    notFound();
  }

  // Check admin privileges (steamId === "2137" for now)
  const isAdmin = user.steamId === '2137';

  if (!isAdmin) {
    notFound();
  }

  // User is authenticated and has admin privileges, render the protected content
  return <>{children}</>;
}
