const figureHorizontalDirection = (delta) => (delta > 0 ? 'SWIPE_RIGHT' : 'SWIPE_LEFT')
const figureVerticalDirection = (delta) => (delta > 0 ? 'SWIPE_DOWN' : 'SWIPE_UP')

export default ({ dx, dy }) =>
  Math.abs(dx) > Math.abs(dy) ? figureHorizontalDirection(dx) : figureVerticalDirection(dy)
