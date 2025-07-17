import { useLike } from "@/contexts/LikeContext";
import useFetchPokemonsByIds from "@/hooks/useFetchPokemonById";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FavoriteCard from "./FavoriteCard";

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

const FavouritePokemon = () => {
  const { favPokemon, clearFavorite, removeFavorite } = useLike();
  const { pokemons, loading } = useFetchPokemonsByIds(favPokemon);

  useFocusEffect(useCallback(() => {}, []));

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!pokemons.length) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>No favourite Pokemons :(</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<Pokemon> = ({ item }) => (
    <FavoriteCard pokemon={item} onRemove={removeFavorite} />
  );

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={clearFavorite}>
        <Text style={styles.removeBtn}>REMOVE ALL</Text>
      </Pressable>
      <FlatList
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  removeBtn: {
    fontSize: 10,
    color: "red",
    textAlign: "right",
  },
});

export default FavouritePokemon;
