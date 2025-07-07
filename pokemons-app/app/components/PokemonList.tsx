import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import useFavouritePokemon from "../hooks/useFavouritePokemon";
import usePokemons from "../hooks/usePokemons";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const { data, loading, loadMore, hasNextPage } = usePokemons();
  const { favPokemon, saveFavorite } = useFavouritePokemon();

  if (!data.length && loading) return <Text>Loading...</Text>;

  type Pokemon = {
    name: string;
    sprite: string;
    // id?: number;
  };

  const handlePress = (pokemon: Pokemon) => {
    saveFavorite({
      name: pokemon.name,
      sprite: pokemon.sprite,
      // id: pokemon.id,
    });
  };
  return (
    <>
      {/* <FlashList
        data={data}
        estimatedItemSize={70}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} sprite={item.sprite} />
        )}
        keyExtractor={(item) => item.name}
        style={{ flex: 1 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && hasNextPage ? <Text>Loading more...</Text> : null
        }
      /> */}
      <View style={{ padding: 10, backgroundColor: "grey", marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Favorite Pokemon: {favPokemon ? favPokemon.name : "None"}
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)}>
            <PokemonCard name={item.name} sprite={item.sprite} />
          </Pressable>
        )}
        keyExtractor={(item) => item.name}
        style={{ flex: 1 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && hasNextPage ? <Text>Loading more...</Text> : null
        }
      />
    </>
  );
};

export default PokemonList;

//   return (
//     <>
//       <View style={{ padding: 10, backgroundColor: "grey", marginBottom: 10 }}>
//         <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//           Favorite Pokemon: {favPokemon ? favPokemon.name : "None"}
//         </Text>
//       </View>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => (
//           <Pressable onPress={() => handlePress(item)}>
//             <PokemonCard name={item.name} sprite={item.sprite} />
//           </Pressable>
//         )}
//         keyExtractor={(item) => item.name}
//         style={{ flex: 1 }}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={
//           loading && hasNextPage ? <Text>Loading more...</Text> : null
//         }
//       />
//     </>
//   );
// };
