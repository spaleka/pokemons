import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import PokemonList from '../components/PokemonList'

export default function Favourite() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text style={styles.titleContainer}> This is your fav pokemon</Text> */}
      <PokemonList />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titlePokemons: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})