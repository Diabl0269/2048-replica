export default (directionKey) => {
  let direction
  switch (directionKey) {
    case 'ArrowLeft':
    case 'SWIPE_LEFT':
      direction = 'left'
      break
    case 'ArrowRight':
    case 'SWIPE_RIGHT':
      direction = 'right'
      break
    case 'ArrowUp':
    case 'SWIPE_UP':
      direction = 'up'
      break
    case 'ArrowDown':
    case 'SWIPE_DOWN':
      direction = 'down'
      break
  }
  return direction
}
