import { usePokemonPins } from "@/contexts/PinPokemonContext";
import useFetchPokemonById from "@/hooks/useFetchPokemonById";
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
      const pokemonId = matchingPin.pokemonId;

      router.push({
        pathname: "/modals/modalPokemon",
        params: {
          id: pokemonId.toString(),
          pinId: matchingPin.id,
        },
      });
    } else {
      Alert.alert("Marker Pressed", `Unknown pin at ${latitude}, ${longitude}`);
    }
  };

  const PokemonMarker = ({ pin }: { pin: any }) => {
    const { pokemon, loading } = useFetchPokemonById(pin.pokemonId);

    if (loading || !pokemon) {
      return (
        <Marker
          key={pin.id}
          coordinate={pin.coordinate}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      );
    }

    return (
      <Marker
        key={pin.id}
        coordinate={pin.coordinate}
        anchor={{ x: 0.5, y: 0.5 }}
        image={{
          uri: pokemon.sprite,
        }}
      />
    );
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
            <PokemonMarker key={pin.id} pin={pin} />
          ))}
        </MapView>
      </View>
    </GestureHandlerRootView>
  );
}
