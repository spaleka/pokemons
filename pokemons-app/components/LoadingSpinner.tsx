import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingSpinner = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="grey" />
    </View>
  );
};
export default LoadingSpinner;

const styles = StyleSheet.create({});
