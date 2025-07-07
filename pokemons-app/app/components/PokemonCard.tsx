import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export type PokemonCardProps = {
  name: string;
  sprite: string;
};
const PokemonCard = ({ name, sprite }: PokemonCardProps) => {
  const [like, setLike] = useState("💔");

  const toggleLike = () => {
    setLike((prev) => (prev === "💔" ? "❤️" : "💔"));
  };
  // const handlePress = () => {
  //   console.log("Pokemon name:", name);
  // };

  return (
    <View style={styles.pokemonContainer}>
      <View style={styles.item}>
        <Image source={{ uri: sprite }} style={styles.image} />
      </View>
      <View style={styles.likeItem}>
        <Pressable onPress={toggleLike}>
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
