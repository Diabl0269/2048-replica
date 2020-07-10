import React from 'react'
import { View } from 'react-native'
import Piece from './Piece';
import MergingPieces from './MergingPieces'
import style from './style'
import { useGame } from '../../context/GameProvider'

export default ({ tile, verticalIndex, horizontalIndex }) => {
  const piece = tile

  const { boardLayoutCoordinates } = useGame()

  //Add x tiles coordinate layout
  const onLayout = ({
    nativeEvent: {
      layout: { x }
    }
  }) => {
    boardLayoutCoordinates[verticalIndex][horizontalIndex] = { x }
  }

  return (
    <View style={style.emptyTile} onLayout={onLayout}>
      {(piece.length && <MergingPieces pieces={piece} />) ||
        (piece !== 0 && <Piece piece={piece} />)}
    </View>
  )
}
