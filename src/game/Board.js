import { boardSize } from '../data/gameVariables.json'

export default class Board {
  size = boardSize
  tiles = new Array(boardSize)
  pieces = {}

  constructor() {
    this.initTiles()
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

  isOccupied({ x, y }) {
    return this.tiles[y][x] !== 0
  }

  setPiecesOnTiles() {
    this.initTiles()
    for (let { x, y, value } of Object.values(this.pieces)) {
      this.tiles[y][x] = value
    }
  }

  getPiece({ x, y }) {
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
