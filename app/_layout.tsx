import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack, Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, ActivityIndicator, LogBox } from "react-native";
import "react-native-reanimated";

import { tokenCache } from "@/lib/auth";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error(
    "Missing Clerk key. Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env",
  );
}

LogBox.ignoreLogs(["Clerk:"]);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <AuthGuard>
          <Stack initialRouteName="(root)">
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
          </Stack>
        </AuthGuard>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  const currentPath = global.location?.pathname || "";
  const isAuthRoute = currentPath.startsWith("/(auth)");

  if (!isSignedIn && !isAuthRoute) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return <>{children}</>;
};
