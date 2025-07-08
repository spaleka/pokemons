import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
        <Text>Type: {favPokemon.types.map((t) => t.type.name).join(", ")}</Text>
      </View>
      <View>
        <Text>
          Abilities:{" "}
          {favPokemon.abilities.map((a) => a.ability.name).join(", ")}
        </Text>
      </View>
      <View>
        <Pressable onPress={clearFavorite}>
          <Text>💔</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap: 12,
  },
  nameItem: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default FavouritePokemon;
