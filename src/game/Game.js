import Board from './Board'
import { initNumTiles, boardSize } from '../data/gameVariables.json'
import { winMessage, loseMessage } from '../data/dictionary.json'
import { rotateLeft, rotateRight, rotateUpsideDown } from './utils/matrixRotation'
import mapKeyToDirection from './utils/mapKeyToDirection';

export default class Game {
  board = new Board()
  score = 0

  constructor(board, score) {
    if (board) this.board = board
    if (score) this.score = score
  }

  moveUp = ({ colNum, rowNum, tiles }) => {
    const movment = (variable) => (variable -= 1)
    const cursor = { x: colNum, y: movment(rowNum) }
    return { movment, cursor, changeAxis: 'y' }
  }

  moveDown = ({ colNum, rowNum }) => {
    const movment = (variable) => (variable += 1)
    const cursor = { x: colNum, y: movment(rowNum) }
    return { movment, cursor, changeAxis: 'y' }
  }

  moveLeft = ({ colNum, rowNum }) => {
    const movment = (variable) => (variable -= 1)
    const cursor = { x: movment(colNum), y: rowNum }
    return { movment, cursor, changeAxis: 'x' }
  }

  moveRight = ({ colNum, rowNum }) => {
    const movment = (variable) => (variable += 1)
    const cursor = { x: movment(colNum), y: rowNum }
    return { movment, cursor, changeAxis: 'x' }
  }

  makeAction(direction) {
    let moveingDirection
    let calculationGame
    let calculationBoard
    let rotateBackFunc
    switch (direction) {
      case 'up':
        moveingDirection = this.moveUp
        calculationGame = new Game(this.board, this.score)
        break
      case 'down':
        moveingDirection = this.moveDown
        calculationBoard = new Board({ tiles: rotateUpsideDown(this.board.tiles), ...this.board })
        calculationGame = new Game(calculationBoard, this.score)
        rotateBackFunc = rotateUpsideDown
        break
      case 'left':
        moveingDirection = this.moveLeft
        calculationBoard = new Board({ tiles: rotateRight(this.board.tiles), ...this.board })
        calculationGame = new Game(calculationBoard, this.score)
        rotateBackFunc = rotateLeft
        break
      case 'right':
        moveingDirection = this.moveRight
        calculationBoard = new Board({ tiles: rotateLeft(this.board.tiles), ...this.board })
        calculationGame = new Game(calculationBoard, this.score)
        rotateBackFunc = rotateRight
        break
    }

    calculationGame.board.tiles.map((row, rowNum) => {
      row.map((tile, colNum) => {
        if (tile.value) {
          const { movment, cursor, changeAxis } = moveingDirection({ colNum, rowNum })

          while (calculationGame.board.inRange(cursor)) {
            if (!calculationGame.board.isOccupied(cursor)) {
              tile[changeAxis] = movment(tile[changeAxis])
              cursor[changeAxis] = movment(cursor[changeAxis])
            } else {
              const key = calculationGame.board.getPieceKey({ x: tile.x, y: tile.y })
              const pieceInContactKey = calculationGame.board.getPieceKey(cursor)
              const pieceInContact = calculationGame.board.pieces[pieceInContactKey]
              if (pieceInContact && pieceInContact.value === tile.value) {
                calculationGame.joinPieces(key, pieceInContactKey, cursor)
                const message = calculationGame.checkWin(calculationGame.board.pieces[key])
                if (message) return { message }
              }
              break
            }
          }
        }
      })
    })
    if (rotateBackFunc) calculationGame.board.tiles = rotateBackFunc(calculationGame.board.tiles)

    this.board = calculationGame.board
    this.score = calculationGame.score
    return {}
  }

  move(directionKey, board) {
    this.board = board
    const direction = mapKeyToDirection(directionKey)
    let { message: winMessage } = this.makeAction(direction)
    if (winMessage) return { message: winMessage }
    const message = this.checkLose()
    if (message) return { message }
    const curBoard = this.board

    // check if the board is not the same as before
    // if (!curBoard.equals(this.board))
    this.board.addPiece()
    // this.board.setPiecesOnTiles()
    return {}
  }

  checkLose() {
    const tilesLength = boardSize * boardSize
    if (Object.keys(this.board.pieces).length === tilesLength) return loseMessage
  }

  checkWin(piece) {
    if (piece.value === 2048) return winMessage
  }

  joinPieces(movingPiece, inPlacePiece, { x, y }) {
    const { value } = this.board.pieces[movingPiece]

    this.board.removePiece(inPlacePiece)
    this.board.pieces[movingPiece] = { x, y, value: value * 2 }
    this.score += this.board.pieces[movingPiece].value
  }

  initGame() {
    this.board.pieces = {}
    this.board.initTiles()
    for (let i = 0; i < initNumTiles; i++) {
      this.board.addPiece()
    }
  }
}
