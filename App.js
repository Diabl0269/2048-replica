import React from 'react'
import { StyleSheet, View, Platform, ScrollView } from 'react-native'
import { colors } from './src/styles/variables'
import Header from './src/components/Header/Header'
import SubHeader from './src/components/SubHeader/SubHeader'
import Board from './src/components/Board/Board'
import { GameProvider } from './src/context/GameProvider'

export default () => {
  return (
    <View style={style.container}>
      <GameProvider>
        <Header />
        <SubHeader />
        <Board />
      </GameProvider>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
