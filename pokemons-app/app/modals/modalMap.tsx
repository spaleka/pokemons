import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalMap() {
  const router = useRouter();
  // const { selectedPokemon } = usePokemonSelection();
  // const { saveFavorite, removeFavorite } = useFavoritePokemon();

  // if (!selectedPokemon) {
  //   return null;
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Text onPress={() => router.back()}>X</Text>

      {/* <PokemonDetails
        id={selectedPokemon.id}
        name={selectedPokemon.name}
        sprite={selectedPokemon.sprite}
        types={selectedPokemon.types.map((t) => t.type.name)}
        abilities={selectedPokemon.abilities.map((a) => a.ability.name)}
        onSaveFavorite={() => saveFavorite(selectedPokemon)}
        onRemoveFavorite={() => removeFavorite(selectedPokemon.id)}
      /> */}

      <Text> MAP MODAL!!!!!!!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
