import axios from "axios";
import { useEffect, useState } from "react";

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonListItem = {
  id: number;
  name: string;
  url: string;
  sprite: string;
  types: Type[];
  abilities: Ability[];
  // height: number;
  // weight: number;
};

function usePokemons() {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const limit = 20;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPokemonDetails = async (url: string) => {
    const res = await axios.get(url);
    const data = res.data;
    return {
      id: data.id,
      name: data.name,
      url: url,
      sprite: data.sprites.front_default,
      types: data.types.map((t: any) => ({
        slot: t.slot,
        type: {
          name: t.type.name,
          url: t.type.url,
        },
      })),
      abilities: data.abilities.map((a: any) => ({
        slot: a.slot,
        is_hidden: a.is_hidden,
        ability: {
          name: a.ability.name,
          url: a.ability.url,
        },
      })),
    };
  };

  const fetchData = async () => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const results = response.data.results;

      const detailedData = await Promise.all(
        results.map(async (pokemon: { name: string; url: string }) => {
          const details = await fetchPokemonDetails(pokemon.url);
          return details;
        })
      );

      setData((prev) => [...prev, ...detailedData]);

      if (!response.data.next) {
        setHasNextPage(false);
      }

      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, loadMore: fetchData, hasNextPage };
}

export default usePokemons;
