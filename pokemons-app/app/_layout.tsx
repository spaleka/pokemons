import ModalHeader from "@/components/ModalHeader";
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
                header: () => <ModalHeader />,
              }}
            />
            <Stack.Screen
              name="modals/modalMap"
              options={{
                presentation: "modal",
                // headerShown: false,
                header: () => <ModalHeader title="CHOOSE POKEMON TO PIN" />,
              }}
            />
            <Stack.Screen
              name="modals/modalPokemon"
              options={{
                presentation: "modal",
                // headerShown: false,
                header: () => <ModalHeader />,
              }}
            />
          </Stack>
        </LikeProvider>
      </PokemonPinsProvider>
    </PokemonSelectionProvider>
  );
}
