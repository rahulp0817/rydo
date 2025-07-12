import ErrorFallback from "@/components/ErrorFallback";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/store/AuthStore";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import RawErrorBoundary from "react-native-error-boundary";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useAuthStore();
  const ErrorBoundary = RawErrorBoundary as any;

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Stack screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="(drawer)" />
          ) : (
            <Stack.Screen name="(auth)" />
          )}
          <Stack.Screen name="explore" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
