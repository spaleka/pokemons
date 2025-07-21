import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabHeaderProps = {
  title: string;
};

export default function TabHeader({ title }: TabHeaderProps) {
  return (
    <SafeAreaView style={styles.titleContainer}>
      {/* <View style={styles.titleContainer}> */}
      <Text style={styles.titlePokemons}>{title}</Text>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titlePokemons: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
