import { useLike } from "@/contexts/LikeContext";
import { SafeAreaView } from "react-native";
import PokemonDetails from "../../components/PokemonDetails";
import { usePokemonSelection } from "../../contexts/PokemonSelectedContext";

export default function ModalHome() {
  const { selectedPokemonId } = usePokemonSelection();
  const { saveFavorite, removeFavorite } = useLike();

  if (!selectedPokemonId) {
    return null;
  }

  return (
    <SafeAreaView>
      <PokemonDetails
        id={selectedPokemonId}
        onSaveFavorite={(id) => saveFavorite({ id })}
        onRemoveFavorite={removeFavorite}
      />
    </SafeAreaView>
  );
}
