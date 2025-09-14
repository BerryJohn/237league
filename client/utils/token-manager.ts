'use client';

// Utility functions for token management on the client side

export class TokenManager {
  // Method 1: Using cookies (automatic with credentials: 'include')
  static async makeAuthenticatedRequest(
    url: string,
    options: RequestInit = {}
  ) {
    return fetch(url, {
      ...options,
      credentials: 'include', // This sends cookies automatically
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  // Method 2: Get tokens explicitly (if you need them for some reason)
  static async getTokens(): Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> {
    try {
      const response = await fetch(
        `http://localhost:${process.env.BACKEND_PORT}/auth/login-tokens`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Failed to get tokens:', error);
      return null;
    }
  }

  // Method 3: Manual token storage in localStorage (less secure)
  static setTokensInStorage(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  static getTokenFromStorage(): string | null {
    return localStorage.getItem('accessToken');
  }

  static clearTokensFromStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Method 4: Using tokens in Authorization header
  static async makeRequestWithBearerToken(
    url: string,
    options: RequestInit = {}
  ) {
    const token = this.getTokenFromStorage();

    if (!token) {
      throw new Error('No access token available');
    }

    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  }

  // Method 5: Refresh tokens when needed
  static async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await fetch(
        `http://localhost:${process.env.BACKEND_PORT}/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }
}

// Usage examples:
export const authUtils = {
  // Recommended: Use cookies (most secure)
  async getCurrentUser() {
    return TokenManager.makeAuthenticatedRequest(
      `http://localhost:${process.env.BACKEND_PORT}/auth/me`
    );
  },

  // Alternative: Get tokens if you need them
  async getMyTokens() {
    const tokens = await TokenManager.getTokens();
    console.log('My tokens:', tokens);
    return tokens;
  },

  // Alternative: Use Authorization header
  async getCurrentUserWithBearer() {
    return TokenManager.makeRequestWithBearerToken(
      `http://localhost:${process.env.BACKEND_PORT}/auth/me`
    );
  },
};
