import { useLike } from "@/contexts/LikeContext";
import { View } from "react-native";
import PokemonDetails from "../../components/PokemonDetails";
import { usePokemonSelection } from "../../contexts/PokemonSelectedContext";

export default function ModalHome() {
  const { selectedPokemonId } = usePokemonSelection();
  const { saveFavorite, removeFavorite } = useLike();

  if (!selectedPokemonId) {
    return null;
  }

  return (
    <View>
      <PokemonDetails
        id={selectedPokemonId}
        onSaveFavorite={(id) => saveFavorite({ id })}
        onRemoveFavorite={removeFavorite}
      />
    </View>
  );
}
