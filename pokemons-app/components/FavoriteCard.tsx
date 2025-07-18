import typeIcons from "@/constants/typeIcons";
import useFetchPokemonById from "@/hooks/useFetchPokemonById";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Pokemon } from "./FavouritePokemon";
import LikeButton from "./LikeButton";

interface FavoriteCardProps {
  id: number;
  onRemove: (id: number) => void;
}

const FavoriteCard = ({ id, onRemove }: FavoriteCardProps) => {
  const { pokemon, loading } = useFetchPokemonById(id);
  const typedPokemon = pokemon as Pokemon | null;
  if (loading) return <Text>Loading...</Text>;
  if (!typedPokemon) return <Text>Not found</Text>;
  return (
    <View style={styles.pokemonContainer}>
      <Image style={styles.image} source={{ uri: typedPokemon.sprite }} />
      <Text style={styles.nameItem}>{typedPokemon.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Type: </Text>
        {typedPokemon.types.map((t) =>
          typeIcons[t.type.name] ? (
            <Image
              key={t.type.name}
              source={typeIcons[t.type.name]}
              style={{ width: 24, height: 24, marginHorizontal: 4 }}
            />
          ) : (
            <Text key={t.type.name}>{t.type.name}</Text>
          )
        )}
      </View>
      <Text>
        Abilities:{" "}
        {typedPokemon.abilities.map((a) => a.ability.name).join(", ")}
      </Text>
      <LikeButton
        id={typedPokemon.id}
        onRemoveFavorite={() => onRemove(typedPokemon.id)}
        onSaveFavorite={() => {}}
        stopPropagation={true}
      />
    </View>
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
    margin: 10,
  },
});
export default FavoriteCard;
