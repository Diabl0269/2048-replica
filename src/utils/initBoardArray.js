import { boardSize } from '../data/gameVariables.json'

export default () => {
  const boardArray = new Array(boardSize)
  for (let i = 0; i < boardSize; i++) {
    boardArray[i] = new Array(boardSize)
  }
  return boardArray
}
