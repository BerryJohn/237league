'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TokenManager } from '../utils/token-manager';
import { userDataType } from '@/types/user';

interface AuthContextType {
  user: userDataType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      // Try to refresh token first
      await TokenManager.refreshAccessToken();
      const response = await TokenManager.makeAuthenticatedRequest(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/auth/me`,
        {
          method: 'GET',
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    // Redirect to Steam login
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/auth/steam`;
  };

  const logout = async () => {
    try {
      await TokenManager.makeAuthenticatedRequest(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/auth/logout`,
        {
          method: 'POST',
        }
      );
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    // Check for auth success/error in URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');

    if (authStatus === 'success') {
      // Remove auth param from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Check auth status after successful Steam login
      checkAuthStatus();
    } else if (authStatus === 'error') {
      console.error('Authentication failed');
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsLoading(false);
    } else {
      // Only check auth status if there's no auth parameter
      checkAuthStatus();
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
