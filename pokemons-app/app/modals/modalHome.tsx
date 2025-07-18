import { Pokemon } from "@/components/FavouritePokemon";
import { useLike } from "@/contexts/LikeContext";
import useFetchPokemonById from "@/hooks/useFetchPokemonById";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonDetails from "../../components/PokemonDetails";
import { usePokemonSelection } from "../../contexts/PokemonSelectedContext";

export default function ModalHome() {
  const { selectedPokemonId } = usePokemonSelection();
  const { pokemon, loading } = useFetchPokemonById(selectedPokemonId);
  const typedPokemon = pokemon as Pokemon | null;
  const { saveFavorite, removeFavorite } = useLike();

  if (!selectedPokemonId) {
    return null;
  }
  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  if (!typedPokemon) {
    return (
      <SafeAreaView>
        <Text>Not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <PokemonDetails
        id={typedPokemon.id}
        name={typedPokemon.name}
        sprite={typedPokemon.sprite}
        types={typedPokemon.types.map((t) => t.type.name)}
        abilities={typedPokemon.abilities.map((a) => a.ability.name)}
        onSaveFavorite={() => saveFavorite({ id: typedPokemon.id })}
        onRemoveFavorite={() => removeFavorite(typedPokemon.id)}
        showButton
      />
    </SafeAreaView>
  );
}
