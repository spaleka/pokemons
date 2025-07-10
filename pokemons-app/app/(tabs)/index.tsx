import { PokemonSelectionProvider } from "@/contexts/PokemonSelectedContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheetHome from "../../components/BottomSheetHome";
import PokemonList from "../../components/PokemonList";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PokemonSelectionProvider>
          <View style={styles.titleContainer}>
            <Text>CHOOSE YOUR POKEMON</Text>
          </View>
          <PokemonList />
          <BottomSheetHome />
        </PokemonSelectionProvider>
      </GestureHandlerRootView>
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
