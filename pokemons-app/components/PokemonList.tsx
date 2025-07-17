import { usePokemonSelection } from "@/contexts/PokemonSelectedContext";
import { PokemonListItem } from "@/hooks/usePokemons";
import { useRouter } from "expo-router";
import React from "react";
import { useLike } from "@/contexts/LikeContext";
import PokemonListBase from "./PokemonListBase";

const PokemonList = () => {
  type Pokemon = PokemonListItem;

  const { saveFavorite, removeFavorite } = useLike();
  const { selectPokemon } = usePokemonSelection();
  const router = useRouter();

  const handlePress = (pokemon: Pokemon) => {
    selectPokemon(pokemon);
    router.push("/modals/modalHome");
  };

  return (
    <PokemonListBase
      showButton
      onPressItem={handlePress}
      onSaveFavorite={saveFavorite}
      onRemoveFavorite={removeFavorite}
    />
  );
};

export default PokemonList;
