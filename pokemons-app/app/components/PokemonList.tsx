import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';
import usePokemons from '../hooks/usePokemons'; // adjust path if needed
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const { data, loading} = usePokemons();

  if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error loading pokemons.</Text>;

  return (
    <View>
      <FlashList
        data={data}
        estimatedItemSize={70}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} sprite={item.sprite} />
        )}
        keyExtractor={item => item.name}
      />
      <Text>PokemonList</Text>
    </View>
  )
}

export default PokemonList