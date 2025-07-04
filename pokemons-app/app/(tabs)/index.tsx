import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonList from "../components/PokemonList";

type PokemonListItem = {
  name: string;
  url: string;
  sprite: string;
};

export default function Home() {
  const [data, setData] = useState<PokemonListItem[]>([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchPokemonDetails = async (url: string) => {
  //   const res = await axios.get(url);
  //   return res.data;
  // };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://pokeapi.co/api/v2/pokemon?limit=30"
  //     );
  //     const results = response.data.results;

  //     const detailedData = await Promise.all(
  //       results.map(async (pokemon: PokemonListItem) => {
  //         const details = await fetchPokemonDetails(pokemon.url);
  //         return {
  //           name: pokemon.name,
  //           id: details.id,
  //           sprite: details.sprites.front_default,
  //         };
  //       })
  //     );

  //     setData(detailedData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

 return (
    <SafeAreaView style={{ flex: 1 }}>
      <PokemonList/>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titlePokemons: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})
