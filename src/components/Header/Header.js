import React from 'react'
import { View, Text } from 'react-native'
import { gameTitle, score, best } from '../../data/dictionary.json'
import DataContainer from '../DataContainer/DataContainer'
import style from './style'
import { useGame, GameProvider } from '../../context/GameProvider'

export default () => {
  const {curScore, highScore} = useGame()
  return (
    <View style={style.container}>
      <Text style={style.titleContainer}>{gameTitle}</Text>
      <View style={style.dataContainersContainer}>
        <DataContainer title={score} data={curScore} />
        <View style={style.emptySpace} />
        <DataContainer title={best} data={highScore} />
      </View>
    </View>
  )
}
