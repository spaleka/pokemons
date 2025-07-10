import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import LikeButtton from "./LikeButton";

export type PokemonCardProps = {
  id: number;
  name: string;
  sprite: string;
  onSaveFavorite: () => void;
  onRemoveFavorite: () => void;
  onPress?: () => void;
};

const PokemonCard = ({
  id,
  name,
  sprite,
  onSaveFavorite,
  onRemoveFavorite,
  onPress,
}: PokemonCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.pokemonContainer}>
      <View style={styles.item}>
        <Image source={{ uri: sprite }} style={styles.image} />
      </View>
      <View style={styles.likeItem}>
        <LikeButtton
          id={id}
          onRemoveFavorite={onRemoveFavorite}
          onSaveFavorite={onSaveFavorite}
          stopPropagation={true}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.pokemonName}>{name}</Text>
      </View>
    </Pressable>
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
  pokemonName: {
    fontSize: 13,
    textTransform: "uppercase",
  },
});

export default PokemonCard;
