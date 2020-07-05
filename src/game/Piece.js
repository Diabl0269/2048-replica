export default class Piece {
  prevX
  prevY
  x
  y
  value
  hasJustAppeared = true

  constructor({ x, y, value }) {
    this.x = x
    this.y = y
    this.value = value
    this.hasJustAppeared = true
  }

  moveTo({ x, y }) {
    if (x || x === 0) {
      this.x = x
    }
    if (y || y === 0) {
      this.y = y
    }
  }

  hasMoved() {
    return !!this.prevX || !!this.prevY
  }

  recCurLocation() {
    this.prevX = this.x
    this.prevY = this.y
  }

  recCurLocationIfNotMoved() {
    if (!this.hasMoved()) this.recCurLocation()
  }

  deletePrevLocation() {
    this.prevX = undefined
    this.prevY = undefined
  }
}
