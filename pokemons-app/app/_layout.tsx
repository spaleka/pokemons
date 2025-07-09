import { LikeProvider } from "@/contexts/LikeContext";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <LikeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LikeProvider>
  );
}
