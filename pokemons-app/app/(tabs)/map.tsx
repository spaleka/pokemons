import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
//TODO bottom sheet

export default function Map() {
  return (
    <View style={{ flex: 1 }}>
      <MapView style={StyleSheet.absoluteFill} provider={PROVIDER_GOOGLE} />
      {/* <Text>Map is under constructiion</Text> */}
    </View>
  );
}
