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
    this.board.setPiecesOnTiles()
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

  joinPieces(movingPiece, inPlacePiece, { x, y }) {
    const { value } = this.board.pieces[movingPiece]

    this.board.removePiece(inPlacePiece)
    this.board.pieces[movingPiece] = { x, y, value: value * 2 }
    this.score += this.board.pieces[movingPiece].value
  }

  //save all pieces in 2d array
  //save merging pieces as array of 3 pieces, always playing the first, and the others will be for animations

  initGame() {
    this.board.pieces = {}
    this.board.initTiles()
    for (let i = 0; i < initNumTiles; i++) {
      this.board.addPiece(true)
    }
  }
}
