import { Animated } from 'react-native'

export default async (tiles) => {
  const animationsArr = []

  tiles.forEach((row) =>
    row.forEach((col) => {
      const { animation, x: curX, y: curY, prevX, prevY } = col

      if ((animation && prevX) || (animation && prevY)) {
        tiles[curY][curX].deletePrevLocation()
        const animationDisplay = Animated.timing(animation, { toValue: { x: 0, y: 0 } })

        animationsArr.push(animationDisplay)
      }
    })
  )
  await Animated.parallel(animationsArr).start()
  return tiles
}
