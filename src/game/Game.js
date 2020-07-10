import Board from './Board'
import { initNumTiles, boardSize } from '../data/gameVariables.json'
import { winMessage, loseMessage } from '../data/dictionary.json'
import mapKeyToDirection from './utils/mapKeyToDirection'
import { isEqual } from 'lodash'

export default class Game {
  board = new Board()
  score = 0

  constructor(game) {
    if (game) {
      this.board = game.board
      this.score = game.score
    }
  }

  move(directionKey) {
    const direction = mapKeyToDirection(directionKey)

    const beforeMovmentTiles = this.board.tiles

    const scoreAddition = this.board.movePieces(direction)
    if (scoreAddition) this.score += scoreAddition
    const message = this.checkGameStatus()

    if (!isEqual(beforeMovmentTiles, this.board.tiles)) this.board.addPiece()
    return { message }
  }

  checkLose() {
    const tilesLength = boardSize * boardSize
    if (Object.keys(this.board.pieces).length === tilesLength) return loseMessage
  }

  checkWin() {
    for (let { value } of Object.values(this.board.pieces)) if (value === 2048) return winMessage
  }

  checkGameStatus() {
    let message = this.checkWin()
    if (!message) message = this.checkLose()
    return message
  }

  initGame() {
    this.board.pieces = {}
    this.board.initTiles()
    for (let i = 0; i < initNumTiles; i++) {
      this.board.addPiece(true)
    }
  }
}
