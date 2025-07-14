import MapList from "@/components/MapList";
import { usePokemonPins } from "@/contexts/PinPokemonContext";
import { PokemonListItem } from "@/hooks/usePokemons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
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
      <View>
        <Text onPress={() => router.back()} style={styles.closeBtn}>
          X
        </Text>
        <Text style={styles.title}>CHOOSE POKEMON TO PIN</Text>
      </View>
      <MapList onSelect={handleSelect} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    fontSize: 18,
    textAlign: "right",
    padding: 15,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
