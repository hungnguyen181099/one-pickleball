import { Stack } from "expo-router";
// import "react-native-reanimated";
import { ThemeProvider as CustomThemeProvider } from "@/contexts/ThemeContext";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBarWrapper } from "@/components/StatusBarWrapper";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

const queryClient = new QueryClient()
export default function RootLayout() {
  const edgeInsets = useSafeAreaInsets();
  const token = "null"; // Replace with actual authentication logic

  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <StatusBarWrapper />
        <View style={{ marginTop: edgeInsets.top, flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!token}>
              <Stack.Screen name="(auth)" />
            </Stack.Protected>
            <Stack.Protected guard={!!token}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack.Protected>
          </Stack>
        </View>
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}
