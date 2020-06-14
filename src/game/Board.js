import { boardSize } from '../data/gameVariables.json'
import generateRandomId from '../utils/generateRandomId'
import chooseRandomCoordinates from '../utils/chooseRandomCoordinates'
import Piece from './Piece'

export default class Board {
  size = boardSize
  tiles = new Array(boardSize)
  pieces = {}

  constructor(oldBoard) {
    if (oldBoard) {
      this.size = oldBoard.size
      this.tiles = oldBoard.tiles
      this.pieces = oldBoard.pieces
    } else this.initTiles()
  }

  initTiles() {
    for (let i = 0; i < this.size; i++) {
      this.tiles[i] = new Array(this.size)
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.tiles[i][j] = 0
      }
    }
  }

  addPiece() {
    const id = generateRandomId()
    let coord = chooseRandomCoordinates()
    let { x, y } = coord
    while (this.tiles[y][x] !== 0) {
      coord = chooseRandomCoordinates()
      x = coord.x
      y = coord.y
    }
    const initValue = Math.random() < 0.9 ? 2 : 4
    this.pieces[id] = new Piece({ x, y, value: initValue })
    this.setPiecesOnTiles()
  }

  isOccupied({ x, y }) {
    return this.tiles[y][x] !== 0
  }

  setPiecesOnTiles() {
    this.initTiles()
    for (let piece of Object.values(this.pieces)) {
      this.tiles[piece.y][piece.x] = piece
    }
  }

  getPieceKey({ x, y }) {
    for (let [key, { x: curX, y: curY }] of Object.entries(this.pieces))
      if (curX === x && curY === y) {
        return key
      }
  }

  removePiece(key) {
    delete this.pieces[key]
  }

  inRange({ x, y }) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size
  }
}
