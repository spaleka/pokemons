import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TabHeader from "@/components/TabHeader";
import FavouritePokemon from "../../components/FavouritePokemon";

export default function Favourite() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabHeader title="YOUR FAVOURITE POKEMONS" />
      <FavouritePokemon />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titlePokemons: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
