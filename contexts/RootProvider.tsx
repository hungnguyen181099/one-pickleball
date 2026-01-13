import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PortalProvider } from '@/components/ui/Portal';

import { ThemeProvider as CustomThemeProvider } from '@/contexts/ThemeContext';

import { usePushNotifications } from '@/hooks/useNotificationPermission';

import { SessionProvider } from './AuthProvider';


type RootProviderProps = {
  children: React.ReactNode;
};

export const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

const RootProvider = ({ children }: RootProviderProps) => {
  // khi nào cần push notification thì mới enable -_-
  // usePushNotifications();

  const [loaded, error] = useFonts({
    'BeVietnamPro-Thin': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-Thin.ttf'),
    'BeVietnamPro-ThinItalic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-ThinItalic.ttf'),

    'BeVietnamPro-ExtraLight': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-ExtraLight.ttf'),
    'BeVietnamPro-ExtraLightItalic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-ExtraLightItalic.ttf'),

    'BeVietnamPro-Light': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-Light.ttf'),
    'BeVietnamPro-LightItalic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-LightItalic.ttf'),

    'BeVietnamPro-Regular': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-Regular.ttf'),
    'BeVietnamPro-Italic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-Italic.ttf'),

    'BeVietnamPro-Medium': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-Medium.ttf'),
    'BeVietnamPro-MediumItalic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-MediumItalic.ttf'),

    'BeVietnamPro-SemiBold': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-SemiBold.ttf'),
    'BeVietnamPro-SemiBoldItalic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-SemiBoldItalic.ttf'),

    'BeVietnamPro-Bold': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-Bold.ttf'),
    'BeVietnamPro-BoldItalic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-BoldItalic.ttf'),

    'BeVietnamPro-ExtraBold': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-ExtraBold.ttf'),
    'BeVietnamPro-ExtraBoldItalic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-ExtraBoldItalic.ttf'),

    'BeVietnamPro-Black': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-Black.ttf'),
    'BeVietnamPro-BlackItalic': require('@/assets/fonts/BeVietnamPro/BeVietnamPro-BlackItalic.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <CustomThemeProvider>{children}</CustomThemeProvider>
          </QueryClientProvider>

          {/* Global */}
          {/* <SplashScreenController /> */}
        </SessionProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default RootProvider;
