import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, {
  LongPressEvent,
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";

export default function Map() {
  // const latitude = 50.05472;
  // const longitude = 19.942983;
  const INITIAL_REGION = {
    latitude: 50.05472,
    longitude: 19.942983,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const router = useRouter();

  const [markers, setMarkers] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  const handleMapPress = (event: LongPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setMarkers((prev) => [...prev, coordinate]);
  };

  const handleMarkerPress = (event: MarkerPressEvent) => {
    // Alert.alert(
    //   "Marker Pressed",
    //   `You pressed a marker at latitude: ${event.nativeEvent.coordinate.latitude}, longitude: ${event.nativeEvent.coordinate.longitude}`
    // );
    router.push("/modals/modalMap");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          onLongPress={handleMapPress}
          onMarkerPress={handleMarkerPress}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              image={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
              }}
            />
          ))}
        </MapView>
        {/* <BottomSheetMap /> */}
      </View>
    </GestureHandlerRootView>
  );
}
