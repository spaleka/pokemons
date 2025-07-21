import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAppState } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Frame,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import {
  Camera,
  Face,
  FaceDetectionOptions,
} from "react-native-vision-camera-face-detector";

export default function CameraScreen() {
  // const [hasPermission, setHasPermission] = useState(true);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [frontCamera, setFrontCamera] = useState(false);
  const [faceCount, setFaceCount] = useState(0);
  const [faces, setFaces] = useState<Face[]>([]);

  const device = useCameraDevice(frontCamera ? "front" : "back");
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active" && hasPermission;

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: "fast",
    landmarkMode: "none",
    contourMode: "none",
    classificationMode: "none",
    minFaceSize: 0.15,
    trackingEnabled: false,
  }).current;

  const handleFacesDetection = (detectedFaces: Face[], frame: Frame) => {
    setFaceCount(detectedFaces.length);
    setFaces(detectedFaces);

    if (detectedFaces.length > 0) {
      console.log(`Detected ${detectedFaces.length} face(s)`);
      detectedFaces.forEach((face, index) => {
        console.log(`Face ${index + 1}:`, face.bounds);
      });
    }
  };

  const toggleCamera = () => {
    setFrontCamera((prev) => !prev);
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera permission not granted</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No camera device</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        faceDetectionCallback={handleFacesDetection}
        faceDetectionOptions={faceDetectionOptions}
      />

      {faces.map((face, index) => (
        <View
          key={index}
          style={[
            styles.faceBox,
            {
              left: face.bounds.x,
              top: face.bounds.y,
              width: face.bounds.width,
              height: face.bounds.width,
            },
          ]}
        />
      ))}

      <View style={styles.controls}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleCamera}>
          <FontAwesome size={28} name="repeat" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#2f5cbeff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  faceBox: {
    position: "absolute",
    borderColor: "red",
    borderWidth: 2,
    zIndex: 100,
  },
});
