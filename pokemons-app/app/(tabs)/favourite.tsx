import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Favourite() {
  return (
    <View style={styles.titleContainer}>
      <Text style= {styles.titlePokemons}>Your favourite POKEMONNNNN!</Text>
    </View>
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