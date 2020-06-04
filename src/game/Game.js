import Board from './Board'
import { initValue, initNumTiles } from '../data/gameVariables.json'

export default class Game {
  board = new Board()

  chooseAction(direction) {
    let action
    switch (direction) {
      case 'ArrowLeft':
        action = (piece) => (piece.x -= 1)
        break
      case 'ArrowRight':
        action = (piece) => (piece.x += 1)
        break
      case 'ArrowUp':
        action = (piece) => (piece.y -= 1)
        break
      case 'ArrowDown':
        action = (piece) => (piece.y += 1)
        break
    }
    return action
  }

  move(direction, board) {
    this.board = board
    const action = this.chooseAction(direction)
    for (let [key, { x, y, value }] of Object.entries(this.board.pieces)) {
      console.log({key, x, y, value })
      let cursor = { x, y }
      action(cursor)
      if (!this.board.inRange(cursor)) continue
      while (this.board.inRange(cursor) && !this.board.isOccupied(cursor)) {
        this.board.pieces[key] = { x: cursor.x, y: cursor.y, value }
        this.board.setPiecesOnTiles()
        action(cursor)
      }
      // const pieceInContact = this.board.getPiece(cursor)
      // if (pieceInContact.value === value) this.joinPieces(piece, pieceInContact)
    }
  }

  //finish this func
  joinPieces(movingPiece, inPlacePiece) {
    inPlacePiece.value *= 2
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
      const { x, y } = this.chooseRandomCoordinates()
      this.board.pieces[i] = { x, y, value: initValue }
      this.board.tiles[y][x] = initValue
    }
  }
}
