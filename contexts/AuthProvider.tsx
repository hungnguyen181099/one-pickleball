import { type PropsWithChildren, createContext, use, useEffect, useState } from 'react';

import { ApiResponse, User } from '@/types';

import { useStorageState } from '@/hooks/use-storage-state';

import { LoginRequest, RegisterRequest, authService } from '@/services/api/auth.service';

interface AuthContextType {
  signIn: (data: LoginRequest) => Promise<ApiResponse<string>>;
  signUp: (data: RegisterRequest) => Promise<ApiResponse<string>>;
  signOut: () => Promise<void>;
  session: string | null;
  isLoading: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Use this hook to access the user info.
export function useSession(): AuthContextType {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setSession(null);
    setUser(null);
  };

  useEffect(() => {
    if (session) {
      authService
        .getProfile()
        .then((response) => {
          if (response.success && response.data) {
            const userData = response.data.user;
            setUser(userData);
          } else {
            logout();
          }
        })
        .catch((err) => logout());
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
            // Check for token in different common places
            const token =
              response.data?.token ||
              response.data?.access_token ||
              (typeof response.data === 'string' ? response.data : null);

            if (response.success && token) {
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
              let token =
                response.data?.token ||
                response.data?.access_token ||
                (typeof response.data === 'string' ? response.data : null);

              // 2. If no token, try to login automatically
              if (!token) {
                console.log('Register successful but no token, attempting auto-login...');
                const loginResp = await authService.login({
                  email: data.email,
                  password: data.password,
                });
                if (loginResp.success) {
                  token =
                    loginResp.data?.token ||
                    loginResp.data?.access_token ||
                    (typeof loginResp.data === 'string' ? loginResp.data : null);
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
        session: session || null,
        isLoading,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
