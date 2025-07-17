import TabHeader from "@/components/TabHeader";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonList from "../../components/PokemonList";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      {/* <PokemonSelectionProvider> */}
      {/* <View style={styles.titleContainer}>
        <Text>CHOOSE YOUR POKEMON</Text>
      </View> */}
      <TabHeader title="POKEMONS" />
      <PokemonList />
      {/* <BottomSheetHome /> */}
      {/* </PokemonSelectionProvider> */}
      {/* </GestureHandlerRootView> */}
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
