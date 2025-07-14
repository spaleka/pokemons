import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonDetails from "../../components/PokemonDetails";
import { usePokemonSelection } from "../../contexts/PokemonSelectedContext";
import useFavoritePokemon from "../../hooks/useFavouritePokemon";

export default function ModalHome() {
  const router = useRouter();
  const { selectedPokemon } = usePokemonSelection();
  const { saveFavorite, removeFavorite } = useFavoritePokemon();

  if (!selectedPokemon) {
    return null;
  }

  return (
    <SafeAreaView>
      <View>
        <Text onPress={() => router.back()} style={styles.removeBtn}>
          X
        </Text>
      </View>
      <View>
        <PokemonDetails
          id={selectedPokemon.id}
          name={selectedPokemon.name}
          sprite={selectedPokemon.sprite}
          types={selectedPokemon.types.map((t) => t.type.name)}
          abilities={selectedPokemon.abilities.map((a) => a.ability.name)}
          onSaveFavorite={() => saveFavorite(selectedPokemon)}
          onRemoveFavorite={() => removeFavorite(selectedPokemon.id)}
          showButton
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtn: {
    fontSize: 18,
    textAlign: "right",
    padding: 15,
  },
});
