import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { PokemonListItem } from "../hooks/usePokemons";

const STORAGE_KEY = "FavPokemon";

// export type FavoritePokemon = {
//   name: string;
//   sprite: string;
//   type?: string[];
// };

const useFavoritePokemon = () => {
  const [favPokemon, setFavPokemon] = useState<PokemonListItem | null>(null);
  // const [favPokemon, setFavPokemon] = useState<FavoritePokemon | null>(null);

  const loadFavorite = useCallback(async () => {
    let value = [];
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      // const value = await AsyncStorage.getAllKeys();
      if (value) {
        setFavPokemon(JSON.parse(value));
      } else {
        setFavPokemon(null);
      }
    } catch (e) {
      console.error("Failed to load favorite Pokémon", e);
    }
  }, []);

  // const saveFavorite = async (pokemon: FavoritePokemon) => {
  const saveFavorite = async (pokemon: PokemonListItem) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pokemon));
      setFavPokemon(pokemon);
    } catch (e) {
      console.error("Failed to save favorite Pokémon", e);
    }
  };

  const clearFavorite = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setFavPokemon(null);
    } catch (e) {
      console.error("Failed to clear favorite Pokémon", e);
    }
  };

  return {
    favPokemon,
    loadFavorite,
    saveFavorite,
    clearFavorite,
  };
};
export default useFavoritePokemon;
