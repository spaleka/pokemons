import React from "react";
import { FlatList, Text } from "react-native";
import usePokemons, { PokemonListItem } from "../hooks/usePokemons";
import PokemonCard from "./PokemonCard";

export type PokemonListBaseProps = {
  showButton?: boolean;
  onPressItem?: (pokemon: PokemonListItem) => void;
  onSaveFavorite?: (pokemon: PokemonListItem) => void;
  onRemoveFavorite?: (id: number) => void;
};

const PokemonListBase = ({
  showButton = true,
  onPressItem,
  onSaveFavorite = () => {},
  onRemoveFavorite = () => {},
}: PokemonListBaseProps) => {
  const { data, loading, loadMore, hasNextPage } = usePokemons();

  if (!data.length && loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PokemonCard
          id={item.id}
          name={item.name}
          sprite={item.sprite}
          onSaveFavorite={() => onSaveFavorite(item)}
          onRemoveFavorite={() => onRemoveFavorite(item.id)}
          onPress={() => onPressItem?.(item)}
          showButton={showButton}
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
  );
};

export default PokemonListBase;
