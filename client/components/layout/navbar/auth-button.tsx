'use client';

import { Button } from '@heroui/button';

import { UserDropdown } from './user-dropdown';
import type { User } from '@shared/types';

interface AuthButtonProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const AuthButton = ({
  isLoading,
  isAuthenticated,
  user,
  onLogin,
  onLogout,
}: AuthButtonProps) => {
  if (isLoading) {
    return (
      <Button isLoading variant="flat">
        Loading...
      </Button>
    );
  }

  if (isAuthenticated && user) {
    return <UserDropdown user={user} onLogout={onLogout} />;
  }

  return (
    <Button color="primary" variant="flat" onPress={onLogin}>
      Zaloguj przez Steam
    </Button>
  );
};
