import { Stack } from "expo-router";
// import "react-native-reanimated";
import { ThemeProvider as CustomThemeProvider } from "@/contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBarWrapper } from "@/components/StatusBarWrapper";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  const token = "null"; // Replace with actual authentication logic

  return (
    <CustomThemeProvider>
      {/* <StatusBarWrapper /> */}
      <SafeAreaView style={{ flex: 1 }} >
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
      </SafeAreaView>
    </CustomThemeProvider>
  );
}
