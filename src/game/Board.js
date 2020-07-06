import { boardSize } from '../data/gameVariables.json'
import generateRandomId from '../utils/generateRandomId'
import chooseRandomCoordinates from '../utils/chooseRandomCoordinates'
import Piece from './Piece'
import initBoardArray from '../utils/initBoardArray'
import chooseRandomInitNumber from './utils/chooseRandomInitNumber'
import {
  indexAddition,
  indexContidion,
  determineMovment
} from './utils/determineMovingIndexProperties'

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
    this.tiles = initBoardArray()
    for (let i = 0; i < this.size; i++) {
      this.tiles[i] = new Array(this.size)
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.tiles[i][j] = 0
      }
    }
  }

  addPiece(newGame) {
    //make sure all other pieces appeared
    if (!newGame) {
      const piecesKeys = Object.keys(this.pieces)
      piecesKeys.forEach((key) => (this.pieces[key].hasJustAppeared = false))
    }

    const id = generateRandomId()
    let coord = chooseRandomCoordinates()
    let { x, y } = coord
    while (this.tiles[y][x] !== 0) {
      coord = chooseRandomCoordinates()
      x = coord.x
      y = coord.y
    }
    const initValue = chooseRandomInitNumber()
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
    for (let [key, { x: curX, y: curY }] of Object.entries(this.pieces)) {
      if (curX === x && curY === y) {
        return key
      }
    }
  }

  removePiece(key) {
    delete this.pieces[key]
  }

  inRange({ x, y }) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size
  }

  joinPieces({ curPieceKey, inPlacePieceKey }) {
    const { x, y } = this.pieces[inPlacePieceKey]
    this.pieces[curPieceKey].moveTo({ x, y })
    this.pieces[curPieceKey].value *= 2
    this.removePiece(inPlacePieceKey)
    this.setPiecesOnTiles()
    return this.pieces[curPieceKey].value
  }

  movePieces(direction) {
    let scoreAddition
    const verticalStartingIndex = direction === 'down' ? this.size - 1 : 0
    const horizontalStartingIndex = direction === 'right' ? this.size - 1 : 0

    const { movment, axis } = determineMovment(direction)

    for (
      let rowIndex = verticalStartingIndex;
      indexContidion(rowIndex, verticalStartingIndex);
      rowIndex = indexAddition(rowIndex, verticalStartingIndex)
    )
      for (
        let colIndex = horizontalStartingIndex;
        indexContidion(colIndex, horizontalStartingIndex);
        colIndex = indexAddition(colIndex, horizontalStartingIndex)
      ) {
        const cursor = { x: colIndex, y: rowIndex }
        if (this.isOccupied(cursor)) {
          const curPieceKey = this.getPieceKey(cursor)
          cursor[axis] = movment(cursor[axis])

          while (this.inRange(cursor))
            if (this.isOccupied(cursor)) {
              this.pieces[curPieceKey].recCurLocationIfNotMoved()

              //check if values match, if so we combine them
              const inPlacePieceKey = this.getPieceKey(cursor)

              if (this.pieces[curPieceKey].value === this.pieces[inPlacePieceKey].value) {
                scoreAddition += this.joinPieces({ curPieceKey, inPlacePieceKey })
              }
              break
            } else {
              this.pieces[curPieceKey].recCurLocationIfNotMoved()

              //move by one in the direction
              this.pieces[curPieceKey].moveTo(cursor)
              cursor[axis] = movment(cursor[axis])
            }
          this.setPiecesOnTiles()
        }
      }
    return scoreAddition
  }

  deleteAllPrevLocations() {
    Object.keys(this.pieces).forEach((key) => {
      this.pieces[key].deletePrevLocation()
    })
  }

  getPiecesLocations() {
    const locations = []
    Object.keys(this.pieces).forEach((key) => {
      const { x, y } = this.pieces[key]
      locations.push({ x, y })
    })
    return locations
  }
}
