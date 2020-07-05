export default (lastValue, startValue) => {
  return lastValue > startValue ? -1 * (lastValue - startValue) : startValue - lastValue
}
