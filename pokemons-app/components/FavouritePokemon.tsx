import { useLike } from "@/contexts/LikeContext";
import React from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PokemonDetails from "./PokemonDetails";

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

const FavouritePokemon = () => {
  const { favPokemon, clearFavorite, removeFavorite } = useLike();

  const renderItem: ListRenderItem<number> = ({ item }) => (
    <PokemonDetails id={item} onRemoveFavorite={removeFavorite} />
  );

  if (!favPokemon.length) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>No favourite Pokemons :(</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={clearFavorite}>
        <Text style={styles.removeBtn}>REMOVE ALL</Text>
      </Pressable>
      <FlatList
        data={favPokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
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
