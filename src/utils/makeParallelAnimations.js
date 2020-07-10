import { Animated, Easing } from 'react-native'

export default async (animationsArr) => {
  console.log(animationsArr)
  const animationDisplay = animationsArr.map((animation) =>
    Animated.timing(animation, {
      toValue: 0,
      duration: 100,
      easing: Easing.ease
    })
  )

  // tiles.forEach((row) =>
  //   row.forEach((col) => {
  //     const { animation, x: curX, y: curY, prevX, prevY } = col
  //     console.log('heu', animation)
  //     if ((animation && prevX) || (animation && prevY)) {
  //       tiles[curY][curX].deletePrevLocation()
  //       const animationDisplay =

  //       animationsArr.push(animationDisplay)
  //     }
  //   })
  // )
  await Animated.parallel(animationDisplay).start()
  // return tiles
}
