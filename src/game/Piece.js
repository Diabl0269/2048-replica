export default class Piece {
  prevX
  prevY
  x
  y
  value

  constructor({ x, y, value }) {
    this.x = x
    this.y = y
    this.value = value
  }

  moveTo({ x, y }) {
    if (x) {
      this.prevX = this.x
      this.x = x
    }
    if (y) {
      this.prevY = this.y
      this.y = y
    }
  }
}
