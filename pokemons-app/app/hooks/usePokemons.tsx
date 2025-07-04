import { useEffect, useState } from "react";

export type PokemonListItem = {
  name: string;
  url: string;
  sprite: string;
}; 
function usePokemons() {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
        const result = await response.json();
        const detailedData = await Promise.all(
          result.results.map(async (pokemon: PokemonListItem) => {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();
            return {
              name: pokemon.name,
              id: details.id,
              sprite: details.sprites.front_default,
            };
          })
        );
        setData(detailedData);
      } catch (err) {
        // setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading};
}
export default usePokemons;