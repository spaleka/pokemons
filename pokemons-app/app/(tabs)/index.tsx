import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PokemonListItem = {
  name: string;
  url: string;
  sprite: string;
};

export default function Home() {
  const [data, setData] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPokemonDetails = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=30"
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

      setData(detailedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.titlePokemons}>CHOOSE POKEMON</Text>
        {/* <Link href="/favourite" style={styles.titlePokemons}>Go to Favourite</Link> */}
      </View>
      <FlatList
          style={styles.pokemonList}
          data={data}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.pokemonItem}>
              <Text>{item.name}</Text>
              <Image source={{ uri: item.sprite }} style={{ width: 50, height: 50 }} />
            </View>

          )}
          />
{/* 
      <FlashList
        data={data}
        estimatedItemSize={70}
        renderItem={({ item }) => (
          <View style={styles.pokemonItem}>
            <Image
              source={{ uri: item.sprite }}
              style={{ width: 50, height: 50 }}
            />
            <Text>{item.name}</Text>
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    // flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titlePokemons: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pokemonList: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  pokemonItem: {
    fontSize: 18,
    marginVertical: 5,
    padding: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
