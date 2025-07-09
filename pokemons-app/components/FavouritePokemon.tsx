import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useFavoritePokemon from "../hooks/useFavouritePokemon";

const FavouritePokemon = () => {
  const { favPokemon, loadFavorite, clearFavorite, removeFavorite } =
    useFavoritePokemon();

  useFocusEffect(
    useCallback(() => {
      loadFavorite();
    }, [loadFavorite])
  );

  if (favPokemon.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>No favourite Pokemons :(</Text>
      </View>
    );
  }

  return (
    <>
      <Pressable onPress={clearFavorite}>
        <Text style={styles.removeBtn}>REMOVE ALL</Text>
      </Pressable>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {favPokemon.map((pokemon) => (
          <View key={pokemon.id} style={styles.pokemonContainer}>
            <Image style={styles.image} source={{ uri: pokemon.sprite }} />
            <Text style={styles.nameItem}>{pokemon.name}</Text>
            <Text>
              Type: {pokemon.types.map((t) => t.type.name).join(", ")}
            </Text>
            <Text>
              Abilities:{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </Text>
            <Pressable onPress={() => removeFavorite(pokemon.id)}>
              <Text>💔</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  pokemonContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap: 12,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
  },
  nameItem: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  image: {
    width: 200,
    height: 200,
  },
  removeBtn: {
    fontSize: 10,
    color: "red",
    textAlign: "right",
  },
});

export default FavouritePokemon;
