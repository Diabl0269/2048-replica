import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { colors } from './src/styles/variables'
import Header from './src/components/Header/Header'
import SubHeader from './src/components/SubHeader/SubHeader'
import Board from './src/components/Board/Board'
import { GameProvider, useGame } from './src/context/GameProvider'
import GestureRecognizer from 'react-native-swipe-gestures'
import figureSwipes from './src/utils/figureSwipes'

export default () => {
  const Content = () => {
    const { move } = useGame()

    const handleSwipe = (swipeInfo) => {
      const action = figureSwipes(swipeInfo)
      move(action)
    }

    return (
      <GestureRecognizer
        style={style.container}
        onSwipe={(direction, { dx, dy }) => handleSwipe({ dx, dy })}
      >
        <Header />
        <SubHeader />
        <Board />
      </GestureRecognizer>
    )
  }

  return (
    <View style={style.container}>
      <GameProvider>
        <Content />
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
