import Board from './Board'
import { initNumTiles, boardSize } from '../data/gameVariables.json'
import { winMessage, loseMessage } from '../data/dictionary.json'

export default class Game {
  board = new Board()
  score = 0

  chooseAction(direction) {
    let action
    switch (direction) {
      case 'ArrowLeft':
      case 'SWIPE_LEFT':
        action = (piece) => (piece.x -= 1)
        break
      case 'ArrowRight':
      case 'SWIPE_RIGHT':
        action = (piece) => (piece.x += 1)
        break
      case 'ArrowUp':
      case 'SWIPE_UP':
        action = (piece) => (piece.y -= 1)
        break
      case 'ArrowDown':
      case 'SWIPE_DOWN':
        action = (piece) => (piece.y += 1)
        break
    }
    return action
  }

  move(direction, board) {
    this.board = board
    let message
    const action = this.chooseAction(direction)
    for (let [key, { x, y, value }] of Object.entries(this.board.pieces)) {
      let cursor = { x, y }
      action(cursor)
      while (this.board.inRange(cursor) && !this.board.isOccupied(cursor)) {
        this.board.pieces[key] = { x: cursor.x, y: cursor.y, value }
        action(cursor)
      }
      if (this.board.inRange(cursor)) {
        const pieceInContactKey = this.board.getPieceKey(cursor)
        const pieceInContact = this.board.pieces[pieceInContactKey]
        if (pieceInContact && pieceInContact.value === value) {
          this.joinPieces(key, pieceInContactKey)
          message = this.checkWin(this.board.pieces[pieceInContactKey])
          if (message) return { message }
        }
      }
    }
    if (!message) {
      message = this.checkLose()
      if (message) return { message }
    }

    this.board.setPiecesOnTiles()
    this.board.addPiece()
    return {}
  }

  checkLose() {
    const tilesLength = boardSize * boardSize
    if (Object.keys(this.board.pieces).length === tilesLength) return loseMessage
  }

  checkWin(piece) {
    if (piece.value === 2048) return winMessage
  }

  joinPieces(movingPiece, inPlacePiece) {
    this.board.removePiece(movingPiece)
    this.board.pieces[inPlacePiece].value *= 2
    this.score += this.board.pieces[inPlacePiece].value
  }

  initGame() {
    this.board.initTiles()
    for (let i = 0; i < initNumTiles; i++) {
      this.board.addPiece()
    }
  }
}
