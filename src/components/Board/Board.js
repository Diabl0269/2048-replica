import React from 'react'
import { View } from 'react-native'
import style from './style'
import { useGame } from '../../context/GameProvider'
import Tile from './Tile'

export default () => {
  const { board, boardLayoutCoordinates, setBoardCoordinates } = useGame()

  const DisplayBoard = () => {
    return (
      <View>
        {board.map((row, rowIndex) => (
          <Row tilesArr={row} key={`r${rowIndex}`} verticalIndex={rowIndex} />
        ))}
      </View>
    )
  }

  const Row = ({ tilesArr, verticalIndex }) => {
    //Add y tiles coordinate layout
    const onLayout = ({
      nativeEvent: {
        layout: { y }
      }
    }) => {
      for (
        let horizontalIndex = 0;
        horizontalIndex < boardLayoutCoordinates.length;
        horizontalIndex++
      ) {
        boardLayoutCoordinates[verticalIndex][horizontalIndex].y = y
        setBoardCoordinates({
          x: horizontalIndex,
          y: verticalIndex,
          coordinates: boardLayoutCoordinates[verticalIndex][horizontalIndex]
        })
      }
    }

    return (
      <View style={style.row} onLayout={onLayout}>
        {tilesArr.map((tile, colIndex) => (
          <Tile
            tile={tile}
            key={`c${colIndex}`}
            horizontalIndex={colIndex}
            verticalIndex={verticalIndex}
          />
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
