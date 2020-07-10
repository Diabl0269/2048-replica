import React, { useEffect } from 'react'
import { View, Animated, Text } from 'react-native'
import Piece from './Piece.js'
import MergedPiece from './MergedPiece.js'

export default ({ pieces }) => {
  return (
    <View>
      <Piece piece={pieces[0]} firstMergingPiece />
      <MergedPiece piece={pieces[1]} />
      <Piece piece={pieces[2]} lastMergingPiece />
    </View>
  )
}
