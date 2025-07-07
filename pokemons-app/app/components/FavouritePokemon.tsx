import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import useFavoritePokemon from "../hooks/useFavouritePokemon";

const FavouritePokemon = () => {
  const { favPokemon, loadFavorite, clearFavorite } = useFavoritePokemon();

  useFocusEffect(
    useCallback(() => {
      loadFavorite();
    }, [loadFavorite])
  );

  if (!favPokemon) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>Brak ulubionego Pokemona.</Text>
      </View>
    );
  }

  return (
    <View style={styles.pokemonContainer}>
      <View>
        <Image
          source={{ uri: favPokemon.sprite }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View>
        <Text style={styles.nameItem}>{favPokemon.name}</Text>
      </View>
      <View>
        <Text>Info: ....</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pokemonContainer: {
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
  },
  nameItem: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default FavouritePokemon;
