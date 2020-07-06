import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Platform, Easing } from 'react-native'
import style from './style'
import { useGame } from '../../context/GameProvider'
import calculateMovingAnimationValue from '../../utils/calculateMovingAnimationValue'

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

  const Tile = ({ tile, verticalIndex, horizontalIndex }) => {
    const piece = tile
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
        {piece !== 0 && <Piece piece={piece} />}
      </View>
    )
  }

  const Piece = ({ piece }) => {
    const { value, prevX, prevY, x, y, hasJustAppeared } = piece
    const animationConfig = {
      toValue: 1,
      duration: 200,
      easing: Easing.ease
    }
    //Decide if the piece has just apepared and if so make the animation
    const appearAnimationValue = new Animated.Value(0)
    const appearAnimation = hasJustAppeared ? appearAnimationValue : 1

    //Add moving animation
    let animationX, animationY

    const { x: xLayOut, y: yLayOut } = boardLayoutCoordinates[y][x]

    const hasMoved = (prevX && prevX !== x) || (prevY && prevY !== y)

    if (hasMoved) {
      const { x: prevXLayOut, y: prevYLayOut } = boardLayoutCoordinates[prevY][prevX]

      animationX = calculateMovingAnimationValue(xLayOut, prevXLayOut)
      animationY = calculateMovingAnimationValue(yLayOut, prevYLayOut)
    }

    const movingAnimation = new Animated.ValueXY({
      x: animationX || 0,
      y: animationY || 0
    })

    const animationStyle = hasJustAppeared
      ? { transform: [{ scale: appearAnimation }] }
      : hasMoved
      ? { transform: movingAnimation.getTranslateTransform() }
      : undefined

    useEffect(() => {
      console.log(prevX)
      const animation = hasJustAppeared ? appearAnimation : movingAnimation
      Animated.timing(animation, animationConfig).start()

      return console.log(prevX)
    }, [])

    return (
      <Animated.View style={[style[`tile${value}`], animationStyle]}>
        <Text style={style.tileText}>{value}</Text>
      </Animated.View>
    )
  }

  return (
    <View style={style.board}>
      <DisplayBoard />
    </View>
  )
}
