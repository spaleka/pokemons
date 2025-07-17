import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CloseButton() {
  const router = useRouter();
  return (
    <View>
      <Text onPress={() => router.back()} style={styles.closeBtn}>
        X
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    fontSize: 18,
    textAlign: "right",
    padding: 15,
  },
});
