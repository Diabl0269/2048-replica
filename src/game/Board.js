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
import { cloneDeep } from 'lodash'

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
      Object.keys(this.pieces).forEach((key) => {
        if (!this.pieces[key].length) this.pieces[key].hasJustAppeared = false
      })
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
      //check if piece is an array for merging
      if (piece.length) {
        const { x, y } = piece[0]
        this.tiles[y][x] = piece
        continue
      }

      const { x, y } = piece
      this.tiles[y][x] = piece
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
            if (
              this.isOccupied(cursor) &&
              this.pieces[curPieceKey] &&
              !this.pieces[curPieceKey].length
            ) {
              this.pieces[curPieceKey].recCurLocationIfNotMoved()

              //check if values match, if so we combine them
              const inPlacePieceKey = this.getPieceKey(cursor)
              if (
                this.pieces[curPieceKey] &&
                this.pieces[inPlacePieceKey] &&
                this.pieces[curPieceKey].value === this.pieces[inPlacePieceKey].value
              ) {
                scoreAddition += this.mergePieces({ curPieceKey, inPlacePieceKey })
              }
              break
            } else {
              if (this.pieces[curPieceKey] && !this.pieces[curPieceKey].length) {
                this.pieces[curPieceKey].recCurLocationIfNotMoved()

                //move by one in the direction
                this.pieces[curPieceKey].moveTo(cursor)
                cursor[axis] = movment(cursor[axis])
              }
              continue
            }
          this.setPiecesOnTiles()
        }
      }
    return scoreAddition
  }

  deleteAllPrevLocations() {
    Object.keys(this.pieces).forEach((key) => {
      if (!this.pieces[key].length) {
        this.pieces[key].deletePrevLocation()
      }
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

  mergePieces({ curPieceKey, inPlacePieceKey }) {
    const { x, y, value } = this.pieces[inPlacePieceKey]
    this.pieces[curPieceKey].moveTo({ x, y })

    const curPiece = this.pieces[curPieceKey]
    const inPlacePiece = this.pieces[inPlacePieceKey]

    this.pieces[curPieceKey] = [curPiece, new Piece({ x, y, value: value * 2 }), inPlacePiece]
    this.removePiece(inPlacePieceKey)
    return this.pieces[curPieceKey][0].value
  }

  fixMergedPieces() {
    //The piece in the first place of the merged pieces array is the new piece
    this.deleteAllPrevLocations()
    Object.keys(this.pieces).forEach((key) => {
      if (this.pieces[key].length) {
        const piece = cloneDeep(this.pieces[key][1])
        this.pieces[key] = piece
      }
      this.pieces[key].hasJustAppeared = false
    })
    this.setPiecesOnTiles()
  }
}
