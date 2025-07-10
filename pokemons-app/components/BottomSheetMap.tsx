import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { StyleSheet, Text } from "react-native";

const BottomSheetMap = () => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        {/* <BottomSheetFlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.sheetContent}
        /> */}
        {/* <PokemonList /> */}
        <Text style={styles.title}>Bottom Sheet Example</Text>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: "#cceeff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  sheetBackground: {
    backgroundColor: "white",
  },
  handleIndicator: {
    backgroundColor: "#aaa",
  },
  sheetContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "#eee",
    margin: 6,
    borderRadius: 6,
  },
});

export default BottomSheetMap;
