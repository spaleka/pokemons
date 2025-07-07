import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export type PokemonCardProps = {
  name: string;
  sprite: string;
};
const PokemonCard = ({ name, sprite }: PokemonCardProps) => {
  return (
    <View style={styles.pokemonItem}>
      <Image source={{ uri: sprite }} style={{ width: 50, height: 50 }} />
      <Text>{name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  pokemonItem: {
    fontSize: 18,
    margin: 5,
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

export default PokemonCard;
