import { Stack, useSegments } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationBarWrapper } from '@/components/NavigationBarWrapper';
import { StatusBarWrapper } from '@/components/StatusBarWrapper';
import { useSession } from '@/contexts/AuthProvider';
import RootProvider from '@/contexts/RootProvider';

import { useThemedColors } from '@/hooks/use-theme';

export default function Root() {
  return (
    <RootProvider>
      <StatusBarWrapper />
      <NavigationBarWrapper />
      <RootNavigator />
    </RootProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();
  const colors = useThemedColors();
  const segments = useSegments();

  const isReferee = segments.some((s: string) => s === 'referee');

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isReferee ? '#000' : colors.card }}
      edges={isReferee ? [] : undefined}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal 123', headerShown: true }} />
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  );
}
