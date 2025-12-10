import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSession } from '@/contexts/AuthProvider';
import RootProvider from '@/contexts/RootProvider';

export default function Root() {
  return (
    <RootProvider>
      <RootNavigator />
    </RootProvider>
  );
}

function RootNavigator() {
  const edgeInsets = useSafeAreaInsets();
  const { session } = useSession();

  return (
    <View style={{ marginTop: edgeInsets.top, flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
