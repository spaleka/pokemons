import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";

type PokemonSelectionContextType = {
  selectedPokemonId: number | null;
  selectPokemon: (id: number) => void;
  clearSelection: () => void;
};

const PokemonSelectionContext = createContext<
  PokemonSelectionContextType | undefined
>(undefined);

export const PokemonSelectionProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null
  );

  const selectPokemon = (id: number) => {
    setSelectedPokemonId(id);
  };

  const clearSelection = () => {
    setSelectedPokemonId(null);
  };

  return (
    <PokemonSelectionContext.Provider
      value={{ selectedPokemonId, selectPokemon, clearSelection }}
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
