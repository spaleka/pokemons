import React from "react";
import { View } from "react-native";
import PokemonList from "../../components/PokemonList";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <PokemonList />
    </View>
  );
}
