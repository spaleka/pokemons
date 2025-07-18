import { PokemonListItem } from "@/hooks/usePokemons";
import axios from "axios";

export default async function fetchPokemonDetails(
  idOrUrl: number | string
): Promise<PokemonListItem> {
  const url =
    typeof idOrUrl === "number"
      ? `https://pokeapi.co/api/v2/pokemon/${idOrUrl}`
      : idOrUrl;
  const res = await axios.get(url);
  const data = res.data;
  return {
    id: data.id,
    name: data.name,
    url: url,
    sprite: data.sprites.front_default,
    types: data.types.map((t: any) => ({
      slot: t.slot,
      type: {
        name: t.type.name,
        url: t.type.url,
      },
    })),
    abilities: data.abilities.map((a: any) => ({
      slot: a.slot,
      is_hidden: a.is_hidden,
      ability: {
        name: a.ability.name,
        url: a.ability.url,
      },
    })),
  };
}
