import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Platform, Easing } from 'react-native'
import style from './style'
import { useGame } from '../../context/GameProvider'
import calculateMovingAnimationValue from '../../utils/calculateMovingAnimationValue'

export default () => {
  const {
    board,
    boardLayoutCoordinates,
    setBoardCoordinates,
    setPieceMovingAnimation,
    addAppearAnimation
  } = useGame()

  // useEffect(() => {
  //   Animated.parallel(
  //     appearAnimations.map((animation) =>
  //       Animated.timing(animation, { toValue: 1, duration: 2000, easing: Easing.ease })
  //     )
  //   ).start()
  //   console.log(appearAnimations)
  // })

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

    let appearAnimation = 1
    useEffect(() => {
      //Add appear animation
      if (hasJustAppeared) {
        appearAnimation = new Animated.Value(0)
        addAppearAnimation(appearAnimation)
      }
    }, [])

    //Add moving animation
    let animationX, animationY

    const { x: xLayOut, y: yLayOut } = boardLayoutCoordinates[y][x]

    if (prevX || prevY) {
      const { x: prevXLayOut, y: prevYLayOut } = boardLayoutCoordinates[prevY][prevX]

      animationX = calculateMovingAnimationValue(xLayOut, prevXLayOut)
      animationY = calculateMovingAnimationValue(yLayOut, prevYLayOut)
    }

    const animation = new Animated.ValueXY({
      x: animationX || 0,
      y: animationY || 0
    })

    setPieceMovingAnimation({
      animation,
      pieceCoords: { x: piece.x, y: piece.y }
    })

    // useEffect(() => {
    //   if (hasJustAppeared)
    //     Animated.timing(appearAnimation, {
    //       toValue: 1,
    //       duration: 100,
    //       easing: Easing.ease
    //     }).start()
    // }, [])

    return (
      <Animated.View style={[style[`tile${value}`], { transform: [{ scale: appearAnimation }] }]}>
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
