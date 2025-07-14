import { PokemonListItem } from "@/hooks/usePokemons";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";

type Pokemon = PokemonListItem;
type Pin = {
  id: string;
  pokemon: Pokemon;
  coordinate: { latitude: number; longitude: number };
};

type ContextType = {
  pins: Pin[];
  addPin: (pin: Pin) => void;
};

const PinPokemonContext = createContext<ContextType | undefined>(undefined);

export const PokemonPinsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [pins, setPins] = useState<Pin[]>([]);

  const addPin = (pin: Pin) => {
    setPins((prev) => [...prev, pin]);
  };

  return (
    <PinPokemonContext.Provider value={{ pins, addPin }}>
      {children}
    </PinPokemonContext.Provider>
  );
};

export const usePokemonPins = () => {
  const context = useContext(PinPokemonContext);
  if (!context)
    throw new Error("usePokemonPins must be used within a PokemonPinsProvider");
  return context;
};
