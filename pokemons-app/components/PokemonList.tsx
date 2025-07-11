import React from "react";
import { FlatList, Text } from "react-native";
import useFavouritePokemon from "../hooks/useFavouritePokemon";
import usePokemons from "../hooks/usePokemons";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const { data, loading, loadMore, hasNextPage } = usePokemons();
  const { saveFavorite, removeFavorite } = useFavouritePokemon();

  if (!data.length && loading) return <Text>Loading...</Text>;

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
        renderItem={({ item }) => (
          <PokemonCard
            id={item.id}
            name={item.name}
            sprite={item.sprite}
            onSaveFavorite={() => saveFavorite(item)}
            onRemoveFavorite={() => removeFavorite(item.id)}
          />
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
