'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TokenManager } from '../utils/token-manager';

interface User {
  id: string;
  displayName: string;
  username: string;
  profileUrl: string;
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      // Try to refresh token first
      await TokenManager.refreshAccessToken();
      const response = await TokenManager.makeAuthenticatedRequest(
        `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/auth/me`,
        {
          method: 'GET',
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
        TokenManager.clearTokensFromStorage();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      TokenManager.clearTokensFromStorage();
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    // Redirect to Steam login
    window.location.href = `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/auth/steam`;
  };

  const logout = async () => {
    try {
      await TokenManager.makeAuthenticatedRequest(
        `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/auth/logout`,
        {
          method: 'POST',
        }
      );
      TokenManager.clearTokensFromStorage();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();

    // Check for auth success/error in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');

    if (authStatus === 'success') {
      // Remove auth param from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Get tokens and save them if available
      TokenManager.getTokens().then((tokens) => {
        if (tokens) {
          TokenManager.setTokensInStorage(
            tokens.accessToken,
            tokens.refreshToken
          );
        }
        checkAuthStatus();
      });
    } else if (authStatus === 'error') {
      console.error('Authentication failed');
      window.history.replaceState({}, document.title, window.location.pathname);
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
