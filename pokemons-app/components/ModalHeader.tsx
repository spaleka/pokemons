import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CloseButton from "./CloseButton";
import TabHeader from "./TabHeader";

type ModalHeaderProp = {
  title: string;
};

export default function ModalHeader({ title }: ModalHeaderProp) {
  return (
    <SafeAreaView>
      <CloseButton />
      <TabHeader title={title} />
    </SafeAreaView>
  );
}
