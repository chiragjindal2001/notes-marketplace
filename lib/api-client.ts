interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshPromise: Promise<TokenPair> | null = null;

  constructor() {
    // Don't read tokens in constructor - read them fresh on each request
  }

  private getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user_token');
    }
    return this.accessToken;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return this.refreshToken;
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  clearAuth(): void {
    this.accessToken = null;
    this.refreshToken = null;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('refreshToken');
    }
  }

  private async refreshTokens(): Promise<TokenPair> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async (): Promise<TokenPair> => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sienna-cod-887616.hostingersite.com/api";
        const response = await fetch(`${apiUrl}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: this.refreshToken,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
        return { 
          accessToken: data.accessToken, 
          refreshToken: data.refreshToken 
        };
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private async request<T = any>(
    method: string,
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<T> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sienna-cod-887616.hostingersite.com/api";
    
    const url = `${apiUrl}${endpoint}`;
    console.log(`[API] ${method} ${url}`, { data });
    
    // Create headers with CORS support
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    // Add any custom headers from options
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers.set(key, value);
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers.set(key, value);
        });
      } else {
        Object.entries(options.headers).forEach(([key, value]) => {
          if (value !== undefined) {
            headers.set(key, String(value));
          }
        });
      }
    }

    const accessToken = this.getAccessToken();
    console.log('API Client - Access Token:', accessToken ? 'Present' : 'Missing');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
      console.log('API Client - Authorization header set');
    } else {
      console.log('API Client - No access token available');
    }

    // Debug: log all request headers
    console.log('Request headers:', Array.from(headers.entries()));

    // Configure request with CORS settings
    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
      mode: 'cors', // Enable CORS
      ...options,
    };

    // Only add body for methods that support it
    if (data && !['GET', 'HEAD'].includes(method.toUpperCase())) {
      config.body = JSON.stringify(data);
    }

    let response: Response;
    
    try {
      response = await fetch(url, config);
    } catch (error) {
      console.error('[API] Network error:', error);
      throw new Error('Network error: Failed to connect to the server');
    }

    if (response.status === 401 && this.getRefreshToken()) {
      try {
        await this.refreshTokens();
        const newAccessToken = this.getAccessToken();
        if (newAccessToken) {
          headers.set('Authorization', `Bearer ${newAccessToken}`);
          const retryResponse = await fetch(url, {
            ...config,
            headers,
          });
          return await this.handleResponse<T>(retryResponse);
        }
      } catch (error) {
        this.clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw error;
      }
    }

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    let data: any;
    try {
      data = await response.json().catch(() => ({}));
    } catch (error) {
      console.error('[API] Failed to parse response as JSON:', error);
      throw new Error('Invalid response from server');
    }
    
    if (!response.ok) {
      console.error('[API] Request failed:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        data
      });
      
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      (error as any).status = response.status;
      (error as any).data = data;
      throw error;
    }

    return data as T;
  }

  async get<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  async post<T = any>(
    endpoint: string, 
    data?: any, 
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>('POST', endpoint, data, options);
  }

  async put<T = any>(
    endpoint: string, 
    data?: any, 
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, data, options);
  }

  async delete<T = any>(
    endpoint: string, 
    data?: any, 
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>('DELETE', endpoint, data, options);
  }

  async patch<T = any>(
    endpoint: string, 
    data?: any, 
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, options);
  }
}

export const apiClient = new ApiClient();
