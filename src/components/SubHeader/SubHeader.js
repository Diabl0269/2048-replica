import React from 'react'
import { View, Text, Button } from 'react-native'
import { useGame } from '../../context/GameProvider'
import {
  subHeaderText,
  subHeaderBoldText,
  newGame as newGameText
} from '../../data/dictionary.json'
import { colors } from '../../styles/variables.json'
import style from './style'

export default () => {
  const { newGame } = useGame()
  const startGame = () => {
    newGame()
  }
  return (
    <View style={style.container}>
      <View style={style.textConteiner}>
        <Text style={style.text}>{subHeaderText}</Text>
        <Text style={style.boldText}>{subHeaderBoldText}</Text>
      </View>
      <View style={style.buttonContainer}>
        <Button title={newGameText} color={colors.buttonContainer} onPress={startGame} />
      </View>
    </View>
  )
}
