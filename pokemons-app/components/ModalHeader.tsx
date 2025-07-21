import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CloseButton from "./CloseButton";

type ModalHeaderProp = {
  title?: string;
};

export default function ModalHeader({ title }: ModalHeaderProp) {
  return (
    <SafeAreaView>
      {title ? (
        <>
          <CloseButton />
          <View style={styles.titleContainer}>
            {/* <TabHeader title={title} /> */}
            <Text style={styles.titlePokemons}>{title}</Text>
          </View>
        </>
      ) : (
        <CloseButton />
      )}
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
