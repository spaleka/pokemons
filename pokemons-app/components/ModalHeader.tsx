import React from "react";
import { View } from "react-native";
import CloseButton from "./CloseButton";
import TabHeader from "./TabHeader";

type ModalHeaderProp = {
  title: string;
};

export default function ModalHeader({ title }: ModalHeaderProp) {
  return (
    <View>
      <CloseButton />
      <TabHeader title={title} />
    </View>
  );
}
