import { useEffect, useState } from "react";
import fetchPokemonDetails from "@/utils/fetchPokemonDetails";
import { PokemonListItem } from "./usePokemons";

export default function useFetchPokemonsByIds(ids: number[]) {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ids.length) {
      setPokemons([]);
      return;
    }
    setLoading(true);
    Promise.all(ids.map((id) => fetchPokemonDetails(id)))
      .then(setPokemons)
      .finally(() => setLoading(false));
  }, [ids]);

  return { pokemons, loading };
}
