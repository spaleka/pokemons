import PokemonDetails from "@/components/PokemonDetails";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalPokemon() {
  const router = useRouter();
  const { id, name, sprite, types, abilities } = useLocalSearchParams<{
    id: string;
    name: string;
    sprite: string;
    types?: string;
    abilities?: string;
  }>();

  const numericId = id && !isNaN(Number(id)) ? Number(id) : 0;
  const typesArray = typeof types === "string" ? types.split(",") : types ?? [];
  const abilitiesArray =
    typeof abilities === "string" ? abilities.split(",") : abilities ?? [];

  return (
    <SafeAreaView>
      <View>
        <Text onPress={() => router.back()} style={styles.removeBtn}>
          X
        </Text>
      </View>
      <View>
        <PokemonDetails
          id={numericId}
          name={name}
          sprite={sprite}
          types={typesArray}
          abilities={abilitiesArray}
          onSaveFavorite={() => {}}
          onRemoveFavorite={() => {}}
          showButton={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtn: {
    fontSize: 18,
    textAlign: "right",
    padding: 15,
  },
});
