import PokemonDetails from "@/components/PokemonDetails";
import { usePokemonPins } from "@/contexts/PinPokemonContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalPokemon() {
  const router = useRouter();
  const { id, name, sprite, types, abilities, pinId } = useLocalSearchParams<{
    id: string;
    name: string;
    sprite: string;
    types?: string;
    abilities?: string;
    pinId: string;
  }>();

  const numericId = id && !isNaN(Number(id)) ? Number(id) : 0;
  const typesArray = typeof types === "string" ? types.split(",") : types ?? [];
  const abilitiesArray =
    typeof abilities === "string" ? abilities.split(",") : abilities ?? [];
  const { removePin } = usePokemonPins();

  const handleRemove = () => {
    if (!pinId || Array.isArray(pinId)) return;
    removePin(pinId);
    router.back();
  };

  return (
    <SafeAreaView>
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
      <Pressable onPress={handleRemove}>
        <FontAwesome
          size={28}
          name="trash"
          color="grey"
          style={styles.closeBtn}
        />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    // fontSize: 18,
    textAlign: "right",
    paddingRight: 25,
  },
});
