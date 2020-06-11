import Board from './Board'
import { initNumTiles, boardSize } from '../data/gameVariables.json'
import { winMessage, loseMessage } from '../data/dictionary.json'

export default class Game {
  board = new Board()
  score = 0

  constructor(board, score) {
    if (board) this.board = board
    if (score) this.score = score
  }

  chooseAction(direction) {
    let message
    switch (direction) {
      case 'ArrowLeft':
      case 'SWIPE_LEFT':
        message = this.makeAction('left')
        break
      case 'ArrowRight':
      case 'SWIPE_RIGHT':
        message = this.makeAction('right')
        break
      case 'ArrowUp':
      case 'SWIPE_UP':
        message = this.makeAction('up')
        break
      case 'ArrowDown':
      case 'SWIPE_DOWN':
        message = this.makeAction('down')
        break
    }
    return { message }
  }

  moveUp = ({ colNum, rowNum }) => {
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
    switch (direction) {
      case 'up':
        moveingDirection = this.moveUp
        break
      case 'down':
        moveingDirection = this.moveDown
        break
      case 'left':
        moveingDirection = this.moveLeft
        break
      case 'right':
        moveingDirection = this.moveRight
        break
    }

    this.board.tiles.map((row, rowNum) => {
      row.map((tile, colNum) => {
        if (tile.value) {

          const { movment, cursor, changeAxis } = moveingDirection({ colNum, rowNum })

          while (this.board.inRange(cursor)) {
            if (!this.board.isOccupied(cursor)) {
              tile[changeAxis] = movment(tile[changeAxis])
              cursor[changeAxis] = movment(cursor[changeAxis])
            } else {
              const key = this.board.getPieceKey({ x: tile.x, y: tile.y })
              const pieceInContactKey = this.board.getPieceKey(cursor)
              const pieceInContact = this.board.pieces[pieceInContactKey]
              if (pieceInContact && pieceInContact.value === tile.value) {
                this.joinPieces(key, pieceInContactKey)
                const message = this.checkWin(this.board.pieces[pieceInContactKey])
                if (message) return { message }
              }
              break
            }
          }
        }
      })
    })
  }

  move(direction, board) {
    this.board = board
    const { message: winMessage } = this.chooseAction(direction)
    if (winMessage) return { message: winMessage }
    const message = this.checkLose()
    if (message) return { message }
    const curBoard = this.board

    // check if the board is not the same as before
    // if (!curBoard.equals(this.board))
    this.board.addPiece()
    this.board.setPiecesOnTiles()
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
    this.board.pieces = {}
    this.board.initTiles()
    for (let i = 0; i < initNumTiles; i++) {
      this.board.addPiece()
    }
  }
}
