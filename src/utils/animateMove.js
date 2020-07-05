import { Animated } from 'react-native'

export default ({ animation, x, y }) => Animated.spring(animation, { toValue: { x, y } })
