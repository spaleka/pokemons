import React from "react";
import { PokemonListItem } from "../hooks/usePokemons";
import PokemonListBase from "./PokemonListBase";

const MapSimpleList = ({
  onSelect,
}: {
  onSelect: (p: PokemonListItem) => void;
}) => {
  return <PokemonListBase showButton={false} onPressItem={onSelect} />;
};

export default MapSimpleList;
