import { useAppState } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import {
  Camera as VisionCamera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function CameraScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (device == null || !hasPermission) return null;

  return (
    <VisionCamera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive}
    />
  );
}
