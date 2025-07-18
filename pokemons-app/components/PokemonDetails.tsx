import typeIcons from "@/constants/typeIcons";
import useFetchPokemonById from "@/hooks/useFetchPokemonById";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LikeButton from "./LikeButton";
import LoadingSpinner from "./LoadingSpinner";

interface PokemonDetailsProps {
  id: number;
  onRemoveFavorite?: (id: number) => void;
  onSaveFavorite?: (id: number) => void;
  showLikeButton?: boolean;
}

const PokemonDetails = ({
  id,
  onRemoveFavorite,
  onSaveFavorite,
  showLikeButton = true,
}: PokemonDetailsProps) => {
  const { pokemon, loading } = useFetchPokemonById(id);

  if (loading) return <LoadingSpinner />;
  if (!pokemon) return <Text>Not found</Text>;
  return (
    <View style={styles.pokemonContainer}>
      <Image style={styles.image} source={{ uri: pokemon.sprite }} />
      <Text style={styles.nameItem}>{pokemon.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Type: </Text>
        {pokemon.types.map((t: any) =>
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
        {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
      </Text>
      {showLikeButton && (
        <LikeButton
          id={pokemon.id}
          onRemoveFavorite={
            onRemoveFavorite ? () => onRemoveFavorite(pokemon.id) : () => {}
          }
          onSaveFavorite={
            onSaveFavorite ? () => onSaveFavorite(pokemon.id) : () => {}
          }
          stopPropagation={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonContainer: {
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
export default PokemonDetails;
