import { Stack } from "expo-router";
// import "react-native-reanimated";
import { ThemeProvider as CustomThemeProvider } from "@/contexts/ThemeContext";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBarWrapper } from "@/components/StatusBarWrapper";
import { View } from "react-native";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  const edgeInsets = useSafeAreaInsets();
  const token = null; // Replace with actual authentication logic

  return (
    <CustomThemeProvider>
      <StatusBarWrapper />
      <View style={{ marginTop: edgeInsets.top, flex:1 }}>
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
  );
}
