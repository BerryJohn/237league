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

  // Method 2: Refresh tokens when needed
  static async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/auth/refresh`,
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
