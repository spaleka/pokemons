import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import LikeButtton from "./LikeButton";

type PokemonDetailsProps = {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  abilities: string[];
  onSaveFavorite: () => void;
  onRemoveFavorite: () => void;
  showButton?: boolean;
};

const PokemonDetails = ({
  id,
  name,
  sprite,
  types,
  abilities,
  onRemoveFavorite,
  onSaveFavorite,
  showButton = true,
}: PokemonDetailsProps) => {
  return (
    <>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.pokemonContainer}>
          <Image style={styles.image} source={{ uri: sprite }} />
          <Text style={styles.nameItem}>{name}</Text>
          <Text>Type: {types?.join(", ")}</Text>
          <Text>Abilities: {abilities?.join(", ")}</Text>
          {showButton && (
            <LikeButtton
              id={id}
              onRemoveFavorite={onRemoveFavorite}
              onSaveFavorite={onSaveFavorite}
              stopPropagation={true}
            />
          )}
        </View>
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
  closeBtn: {
    fontSize: 10,
    color: "red",
    textAlign: "right",
  },
});

export default PokemonDetails;
