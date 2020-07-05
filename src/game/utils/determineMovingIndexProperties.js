import { boardSize } from '../../data/gameVariables.json'

const indexAddition = (index, startingIndex) => (startingIndex === 0 ? index + 1 : index - 1)

const indexContidion = (index, startingIndex) =>
  startingIndex === 0 ? index < boardSize : index >= 0

const determineMovment = (direction) => {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x'

  const movment = (variable) => {
    let changedVariable
    const plus = (variable) => (variable += 1)
    const minus = (variable) => (variable -= 1)

    switch (direction) {
      case 'up':
      case 'left':
        changedVariable = minus(variable)
        break
      case 'down':
      case 'right':
        changedVariable = plus(variable)
        break
    }
    return changedVariable
  }

  return { axis, movment }
}

export { indexAddition, indexContidion, determineMovment }
