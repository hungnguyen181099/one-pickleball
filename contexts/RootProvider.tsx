import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBarWrapper } from '@/components/StatusBarWrapper';
import { SplashScreenController } from '@/components/splash';
import { PortalProvider } from '@/components/ui/Portal';

import { ThemeProvider as CustomThemeProvider } from '@/contexts/ThemeContext';

import { SessionProvider } from './AuthProvider';

type RootProviderProps = {
  children: React.ReactNode;
};

export const queryClient = new QueryClient();

const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <CustomThemeProvider>{children}</CustomThemeProvider>
          </QueryClientProvider>

          {/* Global */}
          <SplashScreenController />
          <StatusBarWrapper />
        </SessionProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default RootProvider;
