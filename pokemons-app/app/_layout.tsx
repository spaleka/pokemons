import { LikeProvider } from "@/contexts/LikeContext";
import { PokemonPinsProvider } from "@/contexts/PinPokemonContext";
import { PokemonSelectionProvider } from "@/contexts/PokemonSelectedContext";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <PokemonSelectionProvider>
      <PokemonPinsProvider>
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
            <Stack.Screen
              name="modals/modalPokemon"
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
          </Stack>
        </LikeProvider>
      </PokemonPinsProvider>
    </PokemonSelectionProvider>
  );
}
