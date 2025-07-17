import { useLike } from "@/contexts/LikeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonDetails from "../../components/PokemonDetails";
import { usePokemonSelection } from "../../contexts/PokemonSelectedContext";

export default function ModalHome() {
  const { selectedPokemon } = usePokemonSelection();
  const { saveFavorite, removeFavorite } = useLike();

  if (!selectedPokemon) {
    return null;
  }

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}
