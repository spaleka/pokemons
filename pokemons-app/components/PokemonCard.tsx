import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LikeButtton from "./LikeButton";
// import useFavouritePokemon from "../hooks/useFavouritePokemon";

export type PokemonCardProps = {
  id: number;
  name: string;
  sprite: string;
  onSaveFavorite: () => void;
  onRemoveFavorite: () => void;
};

const PokemonCard = ({
  id,
  name,
  sprite,
  onSaveFavorite,
  onRemoveFavorite,
}: PokemonCardProps) => {
  return (
    <View style={styles.pokemonContainer}>
      <View style={styles.item}>
        <Image source={{ uri: sprite }} style={styles.image} />
      </View>
      <View style={styles.likeItem}>
        <LikeButtton
          id={id}
          onRemoveFavorite={onRemoveFavorite}
          onSaveFavorite={onSaveFavorite}
        />
      </View>
      <View style={styles.item}>
        <Text>{name}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pokemonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
  },
  likeItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default PokemonCard;
