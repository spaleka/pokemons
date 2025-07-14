import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
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

export const PokemonSelectionProvider: FC<{
  children: ReactNode;
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
