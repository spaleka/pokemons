import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TabHeaderProps = {
  title: string;
};

export default function TabHeader({ title }: TabHeaderProps) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titlePokemons}>{title}</Text>
    </View>
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
