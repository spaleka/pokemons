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
      router.push({
        pathname: "/modals/modalPokemon",
        params: {
          id: matchingPin.pokemon.id.toString(),
          name: matchingPin.pokemon.name,
          sprite: matchingPin.pokemon.sprite,
          types: matchingPin.pokemon.types.map((t) => t.type.name).join(","),
          abilities: matchingPin.pokemon.abilities
            .map((t) => t.ability.name)
            .join(","),
        },
      });
      console.log(matchingPin.pokemon.types);
    } else {
      Alert.alert("Marker Pressed", `Unknown pin at ${latitude}, ${longitude}`);
    }
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
              anchor={{ x: 0.5, y: 0.5 }}
              image={{
                uri: pin.pokemon.sprite,
              }}
            />
          ))}
        </MapView>
        {/* <BottomSheetMap /> */}
      </View>
    </GestureHandlerRootView>
  );
}
