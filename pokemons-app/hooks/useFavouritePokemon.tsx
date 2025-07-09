import { useLike } from "@/contexts/LikeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { PokemonListItem } from "./usePokemons";

const STORAGE_PREFIX = "FavPokemon_";

const useFavoritePokemon = () => {
  const [favPokemon, setFavPokemon] = useState<PokemonListItem[]>([]);
  const { likedItems, toggleLike, isLiked } = useLike();

  const loadFavorite = useCallback(async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const favKeys = allKeys.filter((key) => key.startsWith(STORAGE_PREFIX));

      const stores = await AsyncStorage.multiGet(favKeys);
      const pokemons = stores
        .map(([_, value]) => (value ? JSON.parse(value) : null))
        .filter(Boolean) as PokemonListItem[];

      setFavPokemon(pokemons);
    } catch (e) {
      console.error("Failed to load favorite Pokémon", e);
    }
  }, []);

  const saveFavorite = useCallback(
    async (pokemon: PokemonListItem) => {
      try {
        const key = `${STORAGE_PREFIX}${pokemon.id}`;
        const existing = await AsyncStorage.getItem(key);

        if (!existing) {
          await AsyncStorage.setItem(key, JSON.stringify(pokemon));
        }

        if (!isLiked(pokemon.id)) {
          toggleLike(pokemon.id);
        }
        await loadFavorite();
      } catch (e) {
        console.error("Failed to save favorite Pokémon", e);
      }
    },
    [toggleLike, isLiked, loadFavorite]
  );

  const removeFavorite = useCallback(
    async (pokemonId: number) => {
      try {
        const key = `${STORAGE_PREFIX}${pokemonId}`;
        await AsyncStorage.removeItem(key);
        if (isLiked(pokemonId)) {
          toggleLike(pokemonId);
        }
        await loadFavorite();
      } catch (e) {
        console.error("Failed to remove favorite Pokémon", e);
      }
    },
    [toggleLike, isLiked, loadFavorite]
  );

  const clearFavorite = useCallback(async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const favKeys = allKeys.filter((key) => key.startsWith(STORAGE_PREFIX));
      await AsyncStorage.multiRemove(favKeys);
      setFavPokemon([]);
    } catch (e) {
      console.error("Failed to clear favorite Pokémon list", e);
    }
  }, []);

  useEffect(() => {
    loadFavorite();
  }, [likedItems, loadFavorite]);

  return {
    favPokemon,
    loadFavorite,
    saveFavorite,
    clearFavorite,
    removeFavorite,
  };
};

export default useFavoritePokemon;
