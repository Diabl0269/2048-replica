const rotateLeft = (matrix) => {
  const rows = matrix.length
  const columns = matrix[0].length
  const res = []
  for (let row = 0; row < rows; ++row) {
    res.push([])
    for (let column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1]
    }
  }
  return res
}

const rotateUpsideDown = (matrix) => rotateLeft(rotateLeft(matrix))

const rotateRight = (matrix) => rotateLeft(rotateLeft(rotateLeft(matrix)))

export { rotateLeft, rotateRight, rotateUpsideDown }
