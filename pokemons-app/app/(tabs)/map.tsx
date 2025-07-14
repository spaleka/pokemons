import { usePokemonPins } from "@/contexts/PinPokemonContext";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, {
  LongPressEvent,
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";

export default function Map() {
  const INITIAL_REGION = {
    latitude: 50.05472,
    longitude: 19.942983,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const router = useRouter();
  const { pins } = usePokemonPins();

  const handleMapPress = (event: LongPressEvent) => {
    const { coordinate } = event.nativeEvent;

    router.push({
      pathname: "/modals/modalMap",
      params: {
        lat: coordinate.latitude.toString(),
        lng: coordinate.longitude.toString(),
      },
    });
  };

  const handleMarkerPress = (event: MarkerPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    const matchingPin = pins.find(
      (pin) =>
        pin.coordinate.latitude === latitude &&
        pin.coordinate.longitude === longitude
    );

    if (matchingPin) {
      Alert.alert(
        "You clicked a Pokémon!",
        `Name: ${matchingPin.pokemon.name}`
      );
    } else {
      Alert.alert("Marker Pressed", `Unknown pin at ${latitude}, ${longitude}`);
    }
    // Alert.alert(
    //   "Marker Pressed",
    //   `You pressed a marker at latitude: ${event.nativeEvent.coordinate.latitude}, longitude: ${event.nativeEvent.coordinate.longitude}`
    // );
    // router.push("/modals/modalMap");
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
          {pins.map((pin) => (
            <Marker
              key={pin.id}
              coordinate={pin.coordinate}
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
