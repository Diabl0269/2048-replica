import { boardSize } from '../data/gameVariables.json'
const chooseRandomNumber = () => {
  return Math.floor(Math.random() * Math.floor(boardSize))
}

export default () => {
  const x = chooseRandomNumber()
  const y = chooseRandomNumber()
  return { x, y }
}
