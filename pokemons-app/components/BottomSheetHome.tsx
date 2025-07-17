// import { usePokemonSelection } from "@/contexts/PokemonSelectedContext";
// import useFavoritePokemon from "@/hooks/useFavouritePokemon";
// import BottomSheet from "@gorhom/bottom-sheet";
// import React, { useMemo } from "react";
// import { StyleSheet } from "react-native";
// import PokemonDetails from "./PokemonDetails";

// const BottomSheetHome = () => {
//   // const sheetRef = useRef<BottomSheet>(null);
//   const { selectedPokemon, sheetRef } = usePokemonSelection();
//   const { saveFavorite, removeFavorite } = useFavoritePokemon();

//   const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);

//   if (!selectedPokemon) {
//     return null;
//   }

//   return (
//     <>
//       <BottomSheet
//         ref={sheetRef}
//         index={0}
//         snapPoints={snapPoints}
//         enableDynamicSizing={false}
//         backgroundStyle={styles.sheetBackground}
//         handleIndicatorStyle={styles.handleIndicator}
//       >
//         <PokemonDetails
//           id={selectedPokemon.id}
//           name={selectedPokemon.name}
//           sprite={selectedPokemon.sprite}
//           types={selectedPokemon.types.map((t) => t.type.name)}
//           abilities={selectedPokemon.abilities.map((a) => a.ability.name)}
//           onSaveFavorite={() => saveFavorite(selectedPokemon)}
//           onRemoveFavorite={() => removeFavorite(selectedPokemon.id)}
//         />
//       </BottomSheet>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   mainContent: {
//     flex: 1,
//     backgroundColor: "#cceeff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   sheetBackground: {
//     backgroundColor: "white",
//   },
//   handleIndicator: {
//     backgroundColor: "#aaa",
//   },
//   sheetContent: {
//     paddingBottom: 20,
//   },
//   itemContainer: {
//     padding: 10,
//     backgroundColor: "#eee",
//     margin: 6,
//     borderRadius: 6,
//   },
// });

// export default BottomSheetHome;
