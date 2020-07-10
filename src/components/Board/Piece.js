import React, { useEffect } from 'react'
import { Animated, Text, Easing } from 'react-native'
import calculateMovingAnimationValue from '../../utils/calculateMovingAnimationValue'
import { useGame } from '../../context/GameProvider'
import style from './style'

export default ({ piece, animationStyle, animation, firstMergingPiece, lastMergingPiece }) => {
  const { value, prevX, prevY, x, y, hasJustAppeared } = piece
  const { boardLayoutCoordinates } = useGame()

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

  if (!animationStyle)
    animationStyle = hasJustAppeared
      ? { transform: [{ scale: appearAnimation }] }
      : hasMoved
      ? { transform: movingAnimation.getTranslateTransform() }
      : undefined

  useEffect(() => {
    if (!animation) animation = hasJustAppeared ? appearAnimation : movingAnimation
    Animated.timing(animation, {
      toValue: hasJustAppeared ? 1 : 0,
      duration: 200,
      easing: Easing.ease
    }).start()
  }, [])

  const tileHeigth = calculateMovingAnimationValue(
    boardLayoutCoordinates[0][0].y,
    boardLayoutCoordinates[1][0].y
  )
  const topAddition = firstMergingPiece ? tileHeigth : lastMergingPiece ? -tileHeigth : 0

  return (
    <Animated.View style={[style[`tile${value}`], animationStyle, { top: topAddition }]}>
      <Text style={style.tileText}>{value}</Text>
    </Animated.View>
  )
}
