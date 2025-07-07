import axios from "axios";
import { useEffect, useState } from "react";

export type PokemonListItem = {
  name: string;
  url: string;
  sprite: string;
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
    return res.data;
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
        results.map(async (pokemon: PokemonListItem) => {
          const details = await fetchPokemonDetails(pokemon.url);
          return {
            name: pokemon.name,
            id: details.id,
            sprite: details.sprites.front_default,
          };
        })
      );

      // setData(detailedData);
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  //       const result = await response.json();
  //       const detailedData = await Promise.all(
  //         result.results.map(async (pokemon: PokemonListItem) => {
  //           const detailsResponse = await fetch(pokemon.url);
  //           const details = await detailsResponse.json();
  //           return {
  //             name: pokemon.name,
  //             id: details.id,
  //             sprite: details.sprites.front_default,
  //           };
  //         })
  //       );
  //       setData(detailedData);
  //     } catch (err) {
  //       // setError(err);
  //       console.error("Error fetching data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return { data, loading, loadMore: fetchData, hasNextPage };
}
export default usePokemons;
