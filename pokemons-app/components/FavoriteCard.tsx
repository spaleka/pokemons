import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pokemon } from "./FavouritePokemon";

type Props = {
  pokemon: Pokemon;
  onRemove: (id: number) => void;
};

export default function FavoriteCard({ pokemon, onRemove }: Props) {
  return (
    <View style={styles.pokemonContainer}>
      <Image style={styles.image} source={{ uri: pokemon.sprite }} />
      <Text style={styles.nameItem}>{pokemon.name}</Text>
      <Text>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</Text>
      <Text>
        Abilities: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </Text>
      <Pressable onPress={() => onRemove(pokemon.id)}>
        <FontAwesome size={28} name="heart" color="red" />
      </Pressable>
    </View>
  );
}

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
    margin: 10,
  },
});
