import PokemonDetails from "@/components/PokemonDetails";
import { useLike } from "@/contexts/LikeContext";
import { usePokemonPins } from "@/contexts/PinPokemonContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalPokemon() {
  const router = useRouter();
  const { saveFavorite, removeFavorite } = useLike();
  const { id, pinId } = useLocalSearchParams<{
    id: string;
    pinId: string;
  }>();

  const numericId = id && !isNaN(Number(id)) ? Number(id) : 0;
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
          onSaveFavorite={(id) => saveFavorite({ id })}
          onRemoveFavorite={removeFavorite}
          showLikeButton={false}
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
