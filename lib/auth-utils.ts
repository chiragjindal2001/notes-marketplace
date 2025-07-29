// Authentication utility functions for debugging and checking auth status

export interface AuthStatus {
  isAuthenticated: boolean;
  hasToken: boolean;
  tokenLength: number;
  userData: any | null;
  tokenExpiry?: number;
}

/**
 * Check the current authentication status
 */
export function checkAuthStatus(): AuthStatus {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      hasToken: false,
      tokenLength: 0,
      userData: null
    };
  }

  const token = localStorage.getItem('user_token');
  const userData = localStorage.getItem('user');
  
  let parsedUserData = null;
  let tokenExpiry: number | undefined;

  try {
    if (userData) {
      parsedUserData = JSON.parse(userData);
    }
    
    if (token) {
      // Try to decode JWT to check expiry
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        tokenExpiry = payload.exp;
      }
    }
  } catch (error) {
    console.error('Error parsing auth data:', error);
  }

  return {
    isAuthenticated: !!token && !!userData,
    hasToken: !!token,
    tokenLength: token?.length || 0,
    userData: parsedUserData,
    tokenExpiry
  };
}

/**
 * Log detailed authentication status to console
 */
export function logAuthStatus(): void {
  const status = checkAuthStatus();
  
  console.log('🔐 Authentication Status Check:');
  console.log('Is Authenticated:', status.isAuthenticated);
  console.log('Has Token:', status.hasToken);
  console.log('Token Length:', status.tokenLength);
  console.log('User Data:', status.userData);
  
  if (status.tokenExpiry) {
    const expiryDate = new Date(status.tokenExpiry * 1000);
    const now = new Date();
    const isExpired = status.tokenExpiry < Math.floor(Date.now() / 1000);
    
    console.log('Token Expiry:', expiryDate.toISOString());
    console.log('Is Expired:', isExpired);
    console.log('Time Until Expiry:', expiryDate.getTime() - now.getTime(), 'ms');
  }
  
  console.log('---');
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    console.log('🧹 Authentication data cleared');
  }
}

/**
 * Set authentication data
 */
export function setAuth(token: string, user: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('✅ Authentication data set');
    logAuthStatus();
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(): boolean {
  const status = checkAuthStatus();
  if (!status.tokenExpiry) return true;
  return status.tokenExpiry < Math.floor(Date.now() / 1000);
} 