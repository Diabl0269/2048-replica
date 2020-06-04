import React from 'react'
import { View, Text } from 'react-native'
import { gameTitle, score, best } from '../../data/dictionary.json'
import DataContainer from '../DataContainer/DataContainer'
import style from './style'

export default () => {
  return (
    <View style={style.container}>
      <Text style={style.titleContainer}>{gameTitle}</Text>
      <View style={style.dataContainersContainer}>
        <DataContainer title={score} data={'sample'} />
        <View style={style.emptySpace} />
        <DataContainer title={best} data={'sample'} />
      </View>
    </View>
  )
}
