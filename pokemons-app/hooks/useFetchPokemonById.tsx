import { Pokemon } from "@/components/FavouritePokemon";
import fetchPokemonDetails from "@/utils/fetchPokemonDetails";
import { useEffect, useState } from "react";

export default function useFetchPokemonById(id: number | null) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setPokemon(null);
      return;
    }
    setLoading(true);
    fetchPokemonDetails(id)
      .then(setPokemon)
      .finally(() => setLoading(false));
  }, [id]);

  return { pokemon, loading };
}
