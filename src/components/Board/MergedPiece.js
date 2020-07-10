import React, { useEffect } from 'react'
import { Animated, Text, Easing } from 'react-native'
import style from './style'
import { useGame } from '../../context/GameProvider'

export default ({ piece }) => {
  const { value } = piece
  const { fixMergedPieces } = useGame()

  //Decide if the piece has just apepared and if so make the animation
  const mergeAnimation = new Animated.Value(0)

  const animationStyle = { transform: [{ scale: mergeAnimation }] }

  useEffect(() => {
    Animated.sequence([
      Animated.timing(mergeAnimation, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.ease
        // delay: 1000
      }),
      Animated.timing(mergeAnimation, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease
      })
    ]).start(() => fixMergedPieces())
  }, [])

  return (
    <Animated.View style={[style[`tile${value}`], animationStyle]}>
      <Text style={style.tileText}>{value}</Text>
    </Animated.View>
  )
}
