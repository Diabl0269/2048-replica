import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import style from './style'
import { useGame } from '../../context/GameProvider'
import { TranslateXY } from 'react-native-motion'

export default () => {
  const { board } = useGame()

  const DisplayBoard = () => {
    return (
      <View>
        {board.map((row, i) => (
          <Row tilesArr={row} key={`r${i}`} />
        ))}
      </View>
    )
  }

  const Tile = ({ tile }) => {
    const { value = 0 } = tile
    const styleToUse = value === 0 ? style.emptyTile : style[`tile${value}`]
    return (
      <View style={styleToUse}>
        <Text style={style.tileText}>{value !== 0 && value}</Text>
      </View>
    )
  }

  const Row = ({ tilesArr }) => {
    return (
      <View style={style.row}>
        {tilesArr.map((tile, i) => (
          <TranslateXY duration={250} key={`t${i}`}>
            <Tile tile={tile} key={i} />
          </TranslateXY>
        ))}
      </View>
    )
  }

  return (
    <View style={style.board}>
      <DisplayBoard />
    </View>
  )
}
