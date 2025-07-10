import BottomSheetMap from "@/components/BottomSheetMap";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function Map() {
  const latitude = 37.78825; // Example latitude
  const longitude = -122.4324; // Example longitude
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 50.05472,
            longitude: 19.942983,
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
        <BottomSheetMap />
      </View>
    </GestureHandlerRootView>
  );
}
