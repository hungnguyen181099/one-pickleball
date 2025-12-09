import { useStorageState } from '@/hooks/use-storage-state';
import { authService, LoginRequest, RegisterRequest } from '@/services/api/auth.service';
import ApiClient from '@/services/api/client';
import { ApiResponse, User } from '@/types';
import { createContext, use, useEffect, useState, type PropsWithChildren } from 'react';

interface AuthContextType {
  signIn: (data: LoginRequest) => Promise<ApiResponse<any>>;
  signUp: (data: RegisterRequest) => Promise<ApiResponse<any>>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  user?: User | null;
}

const AuthContext = createContext<AuthContextType>({
  signIn: async () => ({ success: false, error: 'Not implemented' }),
  signUp: async () => ({ success: false, error: 'Not implemented' }),
  signOut: () => null,
  session: null,
  isLoading: false,
  user: null,
});

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Register the logout callback with the API client
    ApiClient.setLogoutCallback(() => {
      setSession(null);
      setUser(null);
    });
  }, [setSession]);

  useEffect(() => {
    if (session) {
      authService.getProfile().then(response => {
        if (response.success && response.data) {
          // Handle nested user object if present (api/auth/me returns {success: true, user: {...}})
          const userData = (response.data as any).user || response.data;
          setUser(userData);
        }
      }).catch(err => console.error('Failed to fetch profile:', err));
    } else {
      setUser(null);
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data: LoginRequest) => {
          try {
            const response = await authService.login(data);
            console.log('Login Response Debug:', JSON.stringify(response, null, 2));

            // Check for token in different common places
            const token = response.data?.token || response.data?.access_token || (typeof response.data === 'string' ? response.data : null);

            if (response.success && token) {
              console.log('Setting session token:', token);
              setSession(token);
            } else {
              console.log('Login successful but no token found in response.data');
            }
            return response;
          } catch (error: any) {
            return {
              success: false,
              error: error.message || 'Login failed',
            };
          }
        },
        signUp: async (data: RegisterRequest) => {
          try {
            const response = await authService.register(data);

            if (response.success) {
              // 1. Try to get token from register response
              let token = response.data?.token || response.data?.access_token || (typeof response.data === 'string' ? response.data : null);

              // 2. If no token, try to login automatically
              if (!token) {
                console.log('Register successful but no token, attempting auto-login...');
                const loginResp = await authService.login({
                  email: data.email,
                  password: data.password
                });
                if (loginResp.success) {
                  token = loginResp.data?.token || loginResp.data?.access_token || (typeof loginResp.data === 'string' ? loginResp.data : null);
                }
              }

              // 3. Set session if we have a token
              if (token) {
                setSession(token);
              }
            }

            return response;
          } catch (error: any) {
            return {
              success: false,
              error: error.message || 'Registration failed',
            };
          }
        },
        signOut: async () => {
          try {
            await authService.logout();
          } catch (error) {
            console.error('Logout failed:', error);
          } finally {
            setSession(null);
            setUser(null);
          }
        },
        session,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
