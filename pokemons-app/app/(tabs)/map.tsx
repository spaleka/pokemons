import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
//TODO bottom sheet

export default function Map() {
  const latitude = 37.78825; // Example latitude
  const longitude = -122.4324; // Example longitude
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          // image={{ uri: "custom_pin" }}
        />
      </MapView>
      {/* <Text>Map is under constructiion</Text> */}
    </View>
  );
}
