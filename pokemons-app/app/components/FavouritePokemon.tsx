import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FavouritePokemon = () => {
  return (
    <View style={styles.pokemonContainer}>
      {/* <View style={styles.item}>
        <Image source={{ uri: sprite }} style={styles.image} />
      </View> */}
      <View>
        <Text style={{ fontSize: 22 }}> OBRAZEK</Text>
      </View>
      <View>
        <Text>Nazwa</Text>
      </View>
      <View>
        <Text>Info: ....</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pokemonContainer: {
    // flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
  },
  //   item: {
  //     flex: 1,
  //     alignItems: "center",
  //   },
});
export default FavouritePokemon;
