import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { PokemonListItem } from "../hooks/usePokemons";

// const STORAGE_KEY = "FavPokemon";
const STORAGE_PREFIX = "FavPokemon_";

const useFavoritePokemon = () => {
  // const [favPokemon, setFavPokemon] = useState<PokemonListItem | null>(null);
  const [favPokemon, setFavPokemon] = useState<PokemonListItem[]>([]);

  const loadFavorite = useCallback(async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const favKeys = allKeys.filter((key) => key.startsWith(STORAGE_PREFIX));

      const stores = await AsyncStorage.multiGet(favKeys);
      const pokemons = stores
        .map(([_, value]) => value && JSON.parse(value))
        .filter(Boolean);

      setFavPokemon(pokemons);
    } catch (e) {
      console.error("Failed to load favorite Pokémon", e);
    }
  }, []);

  const saveFavorite = async (pokemon: PokemonListItem) => {
    try {
      const key = `${STORAGE_PREFIX}${pokemon.id}`;
      const existing = await AsyncStorage.getItem(key);

      if (!existing) {
        await AsyncStorage.setItem(key, JSON.stringify(pokemon));
        await loadFavorite();
      } else {
        console.log("Pokemon już jest zapisany jako ulubiony.");
      }
    } catch (e) {
      console.error("Failed to save favorite Pokémon", e);
    }
  };

  const removeFavorite = async (pokemonId: number) => {
    try {
      const key = `${STORAGE_PREFIX}${pokemonId}`;
      await AsyncStorage.removeItem(key);
      await loadFavorite();
    } catch (e) {
      console.error("Failed to remove favorite Pokémon", e);
    }
  };

  const clearFavorite = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const favKeys = allKeys.filter((key) => key.startsWith(STORAGE_PREFIX));
      await AsyncStorage.multiRemove(favKeys);
      setFavPokemon([]);
    } catch (e) {
      console.error("Failed to clear favorite Pokémon list", e);
    }
  };

  // const loadFavorite = useCallback(async () => {
  //   let value = [];
  //   try {
  //     const value = await AsyncStorage.getItem(STORAGE_KEY);
  //     // const value = await AsyncStorage.getAllKeys();
  //     if (value) {
  //       setFavPokemon(JSON.parse(value));
  //     } else {
  //       setFavPokemon(null);
  //     }
  //   } catch (e) {
  //     console.error("Failed to load favorite Pokémon", e);
  //   }
  // }, []);

  // const saveFavorite = async (pokemon: PokemonListItem) => {
  //   try {
  //     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pokemon));
  //     setFavPokemon(pokemon);
  //   } catch (e) {
  //     console.error("Failed to save favorite Pokémon", e);
  //   }
  // };

  // const clearFavorite = async () => {
  //   try {
  //     await AsyncStorage.removeItem(STORAGE_KEY);
  //     setFavPokemon(null);
  //   } catch (e) {
  //     console.error("Failed to clear favorite Pokémon", e);
  //   }
  // };

  return {
    favPokemon,
    loadFavorite,
    saveFavorite,
    clearFavorite,
    removeFavorite,
  };
};
export default useFavoritePokemon;
