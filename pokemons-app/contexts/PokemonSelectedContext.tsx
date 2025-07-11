import React, { createContext, useContext, useState } from "react";
import { PokemonListItem } from "../hooks/usePokemons";

type Pokemon = PokemonListItem;

type PokemonSelectionContextType = {
  selectedPokemon: Pokemon | null;
  selectPokemon: (pokemon: Pokemon) => void;
  clearSelection: () => void;
};

const PokemonSelectionContext = createContext<
  PokemonSelectionContextType | undefined
>(undefined);

export const PokemonSelectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const selectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const clearSelection = () => {
    setSelectedPokemon(null);
  };

  return (
    <PokemonSelectionContext.Provider
      value={{ selectedPokemon, selectPokemon, clearSelection }}
    >
      {children}
    </PokemonSelectionContext.Provider>
  );
};

export const usePokemonSelection = () => {
  const context = useContext(PokemonSelectionContext);
  if (!context) {
    throw new Error(
      "usePokemonSelection must be used within a PokemonSelectionProvider"
    );
  }
  return context;
};

// import BottomSheet from "@gorhom/bottom-sheet";
// import React, { createContext, useContext, useRef, useState } from "react";
// import { PokemonListItem } from "../hooks/usePokemons";

// type Pokemon = PokemonListItem;

// type PokemonSelectionContextType = {
//   selectedPokemon: Pokemon | null;
//   openBottomSheet: (pokemon: Pokemon) => void;
//   closeBottomSheet: () => void;
//   sheetRef: React.RefObject<BottomSheet | null>;
// };

// const PokemonSelectionContext = createContext<
//   PokemonSelectionContextType | undefined
// >(undefined);

// export const PokemonSelectionProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
//   const sheetRef = useRef<BottomSheet | null>(null);

//   const openBottomSheet = (pokemon: Pokemon) => {
//     setSelectedPokemon(pokemon);
//     (sheetRef.current as any)?.expand();
//   };

//   const closeBottomSheet = () => {
//     (sheetRef.current as any)?.close();
//     setSelectedPokemon(null);
//   };

//   return (
//     <PokemonSelectionContext.Provider
//       value={{ selectedPokemon, openBottomSheet, closeBottomSheet, sheetRef }}
//     >
//       {children}
//     </PokemonSelectionContext.Provider>
//   );
// };

// export const usePokemonSelection = () => {
//   const context = useContext(PokemonSelectionContext);
//   if (!context) {
//     throw new Error(
//       "usePokemonSelection must be used within a PokemonSelectionProvider"
//     );
//   }
//   return context;
// };
