import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import useFavouritePokemon from "../hooks/useFavouritePokemon";

export type PokemonCardProps = {
  name: string;
  sprite: string;
  onSaveFavorite: () => void;
};
// export type PokemonCardProps = FavoritePokemon;

const PokemonCard = ({ name, sprite, onSaveFavorite }: PokemonCardProps) => {
  // const liked = <FontAwesome size={25} name="heart" color={"red"} />;
  // const unliked = <FontAwesome size={25} name="heart-o" color={"black"} />;
  // const [like, setLike] = useState(unliked);
  const [like, setLike] = useState("💔");

  const { saveFavorite } = useFavouritePokemon();

  // type Pokemon = {
  //   name: string;
  //   sprite: string;
  // };

  const handlePress = () => {
    setLike((prev) => (prev === "💔" ? "❤️" : "💔"));
    onSaveFavorite();
  };

  return (
    <View style={styles.pokemonContainer}>
      <View style={styles.item}>
        <Image source={{ uri: sprite }} style={styles.image} />
      </View>
      <View style={styles.likeItem}>
        <Pressable onPress={() => handlePress()}>
          <Text style={{ fontSize: 22 }}>{like}</Text>
        </Pressable>
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
