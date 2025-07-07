import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { FlatList, Pressable, Text } from "react-native";
import usePokemons from "../hooks/usePokemons"; // adjust path if needed
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const { data, loading, loadMore, hasNextPage } = usePokemons();

  if (!data.length && loading) return <Text>Loading...</Text>;

  interface StorePokemon {
    (value: string): Promise<void>;
  }

  const storePokemon: StorePokemon = async (value) => {
    try {
      await AsyncStorage.setItem("pokemonsName", value);
    } catch (e) {
      // saving error
    }
  };
  const handlePress = (name: string) => {
    console.log("Pokemon name:", name);
    storePokemon(name);
  };

  return (
    <>
      {/* <FlashList
        data={data}
        estimatedItemSize={70}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} sprite={item.sprite} />
        )}
        keyExtractor={(item) => item.name}
        style={{ flex: 1 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && hasNextPage ? <Text>Loading more...</Text> : null
        }
      /> */}
      <FlatList
        data={data}
        // estimatedItemSize={70}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.name)}>
            <PokemonCard name={item.name} sprite={item.sprite} />
          </Pressable>
        )}
        keyExtractor={(item) => item.name}
        style={{ flex: 1 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && hasNextPage ? <Text>Loading more...</Text> : null
        }
      />
    </>
  );
};

export default PokemonList;
