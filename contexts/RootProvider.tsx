import { SplashScreenController } from '@/components/splash';
import { StatusBarWrapper } from '@/components/StatusBarWrapper';
import { ThemeProvider as CustomThemeProvider } from '@/contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SessionProvider } from './AuthProvider';

type RootProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </QueryClientProvider>

      {/* Global */}
      <SplashScreenController />
      <StatusBarWrapper />
    </SessionProvider>
  );
};

export default RootProvider;
