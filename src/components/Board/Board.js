import React from 'react'
import { View, Text } from 'react-native'
import style from './style'
import { useGame } from '../../context/GameProvider'

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
    const styleToUse = tile === 0 ? style.emptyTile : style[`tile${tile}`]
    return (
      <View style={styleToUse}>
        <Text style={style.tileText}>{tile !== 0 && tile}</Text>
      </View>
    )
  }

  const Row = ({ tilesArr }) => {
    return (
      <View style={style.row}>
        {tilesArr.map((tile, i) => (
          <Tile tile={tile} key={i} />
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
