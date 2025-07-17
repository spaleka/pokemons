import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function CloseButton() {
  const router = useRouter();
  return (
    <View>
      <FontAwesome
        onPress={() => router.back()}
        style={styles.closeBtn}
        size={25}
        name="close"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    textAlign: "right",
    padding: 15,
  },
});
