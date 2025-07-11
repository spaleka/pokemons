import { LikeProvider } from "@/contexts/LikeContext";
import { PokemonSelectionProvider } from "@/contexts/PokemonSelectedContext";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <PokemonSelectionProvider>
      <LikeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modals/modalHome"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="modals/modalMap"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </LikeProvider>
    </PokemonSelectionProvider>
  );
}
