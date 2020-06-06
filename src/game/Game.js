import Board from './Board'
import { initValue, initNumTiles } from '../data/gameVariables.json'

export default class Game {
  board = new Board()

  chooseAction(direction) {
    console.log(direction)
    let action
    switch (direction) {
      case 'ArrowLeft' || 'SWIPE_LEFT':
        action = (piece) => (piece.x -= 1)
        break
      case 'ArrowRight' || 'SWIPE_RIGHT':
        action = (piece) => (piece.x += 1)
        break
      case 'ArrowUp' || 'SWIPE_UP':
        action = (piece) => (piece.y -= 1)
        break
      case 'ArrowDown' || 'SWIPE_DOWN':
        action = (piece) => (piece.y += 1)
        break
    }
    return action
  }

  move(direction, board) {
    this.board = board
    const action = this.chooseAction(direction)
    for (let [key, { x, y, value }] of Object.entries(this.board.pieces)) {
      let cursor = { x, y }
      action(cursor)
      while (this.board.inRange(cursor) && !this.board.isOccupied(cursor)) {
        this.board.pieces[key] = { x: cursor.x, y: cursor.y, value }
        action(cursor)
      }
      if (this.board.inRange(cursor)) {
        const pieceInContact = this.board.getPieceKey(cursor)
        if (this.board.pieces[pieceInContact].value === value) this.joinPieces(key, pieceInContact)
      }
    }
    this.board.setPiecesOnTiles()
  }

  //finish this func
  joinPieces(movingPiece, inPlacePiece) {
    this.board.removePiece(movingPiece)
    this.board.pieces[inPlacePiece].value *= 2
  }

  chooseRandomNumber() {
    return Math.floor(Math.random() * Math.floor(this.board.size))
  }

  chooseRandomCoordinates() {
    const x = this.chooseRandomNumber()
    const y = this.chooseRandomNumber()
    return { x, y }
  }

  initGame() {
    this.board.initTiles()
    for (let i = 0; i < initNumTiles; i++) {
      let cursor = this.chooseRandomCoordinates()
      while (this.board.getPieceKey(cursor) && this.board.tiles[cursor.y][cursor.x].value !== 0)
        cursor = this.chooseRandomCoordinates()
      const { x, y } = cursor
      this.board.pieces[i] = { x, y, value: initValue }
      this.board.tiles[y][x] = initValue
    }
  }
}
