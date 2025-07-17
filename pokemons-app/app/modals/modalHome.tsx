import CloseButton from "@/components/CloseButton";
import { useLike } from "@/contexts/LikeContext";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonDetails from "../../components/PokemonDetails";
import { usePokemonSelection } from "../../contexts/PokemonSelectedContext";

export default function ModalHome() {
  const router = useRouter();
  const { selectedPokemon } = usePokemonSelection();
  const { saveFavorite, removeFavorite } = useLike();

  if (!selectedPokemon) {
    return null;
  }

  return (
    <SafeAreaView>
      {/* <View>
        <Text onPress={() => router.back()} style={styles.closeBtn}>
          X
        </Text>
      </View> */}
      <CloseButton />

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
  closeBtn: {
    fontSize: 18,
    textAlign: "right",
    padding: 15,
  },
});
