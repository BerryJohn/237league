'use client';

import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { title, subtitle } from '@/components/primitives';

interface UserProtectedRouteProps {
  children: React.ReactNode;
}

export default function UserProtectedRoute({
  children,
}: UserProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, login } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!isAuthenticated || !user) {
    return (
      <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10 min-h-[50vh]">
        <div className="inline-block max-w-lg text-center">
          <h1 className={title({ size: 'lg' })}>Wymagane logowanie</h1>
          <p className={subtitle({ class: 'mt-4' })}>
            Aby uzyskać dostęp do tej strony, musisz być zalogowany.
          </p>
        </div>
        <Card className="max-w-md">
          <CardBody className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <p className="text-default-600 mb-4">
                Zaloguj się za pomocą Steam, aby kontynuować.
              </p>
            </div>
            <Button
              color="primary"
              size="lg"
              onPress={login}
              className="w-full"
            >
              Zaloguj się przez Steam
            </Button>
          </CardBody>
        </Card>
      </section>
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
