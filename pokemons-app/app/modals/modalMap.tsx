import MapList from "@/components/MapList";
import { usePokemonPins } from "@/contexts/PinPokemonContext";
import { PokemonListItem } from "@/hooks/usePokemons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalMap() {
  const router = useRouter();
  const { addPin } = usePokemonPins();
  const { lat, lng } = useLocalSearchParams();

  const handleSelect = (pokemon: PokemonListItem) => {
    const coordinate = {
      latitude: parseFloat(lat as string),
      longitude: parseFloat(lng as string),
    };

    addPin({
      id: Math.random().toString(),
      pokemon,
      coordinate,
    });

    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapList onSelect={handleSelect} />
    </SafeAreaView>
  );
}
