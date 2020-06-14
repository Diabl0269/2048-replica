import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Platform } from 'react-native'
import style from './style'
import { useGame } from '../../context/GameProvider'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

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
        boardLayoutCoordinates[verticalIndex][horizontalIndex]
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

  const Tile = ({ tile, verticalIndex, horizontalIndex }) => {
    const piece = tile
    const onLayout = ({
      nativeEvent: {
        layout: { x }
      }
    }) => {
      boardLayoutCoordinates[verticalIndex][horizontalIndex] = { x }
    }
    return (
      <View style={style.emptyTile} onLayout={onLayout}>
        {piece !== 0 && <Piece piece={piece} />}
      </View>
    )
  }

  const Piece = ({ piece }) => {
    const { value } = piece
    piece.moveTo({ x: 1 })
    console.log(board)
    // console.log(boardLayoutCoordinates[piece.y][piece.x])
    useEffect(() => {
      // console.log({
      //   boardLayoutCoordinates,
      //   pieceCoord: boardLayoutCoordinates[piece.y][piece.x],
      //   piece
        // cond:
        //   boardLayoutCoordinates[piece.y] &&
        //   boardLayoutCoordinates[piece.y][piece.x] &&
        //   boardLayoutCoordinates[piece.prevY] &&
        //   boardLayoutCoordinates[piece.prevY][piece.prevX]
      // })

      if (
        boardLayoutCoordinates[piece.y] &&
        boardLayoutCoordinates[piece.y][piece.x] &&
        boardLayoutCoordinates[piece.prevY] &&
        boardLayoutCoordinates[piece.prevY][piece.prevX]
      ) {
        const dX =
          boardLayoutCoordinates[piece.y][piece.x].x -
          boardLayoutCoordinates[piece.prevY][piece.prevX].x
        animateMove({ x: dX, y: 0 }).start()
        console.log('hello')
      }
    }, [boardLayoutCoordinates])

    const animation = new Animated.ValueXY()

    const animateMove = ({ x, y }) => {
      Animated.spring(animation, { toValue: { x, y } })
    }
    

    // document.onkeydown = () => {
    //   console.log('hey')

    //   // const movment = { x:  }
    //   animateMove({ x: hp('19.75%'), y: 0 }).start()
    // }

    return (
      <Animated.View
        style={[style[`tile${value}`], { transform: animation.getTranslateTransform() }]}
      >
        <Text style={style.tileText}>{value}</Text>
      </Animated.View>
    )
  }
  // console.log(boardLayoutCoordinates)

  return (
    <View style={style.board}>
      <DisplayBoard />
    </View>
  )
}
