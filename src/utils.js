export const createListOfRandomArrows = (wins) => {
  let arrows = []
  const leftArrow = '&#8592;'
  const rightArrow = '&#8594;'
  const upArrow = '&#8593;'
  const downArrow = '&#8595;'
  const arrowValues = [leftArrow, rightArrow, upArrow, downArrow]
  const createListOfRandomArrows = (range) => {
    return [...Array(range).keys()].map(
      () => arrowValues[Math.floor(Math.random() * arrowValues.length)]
    )
  }

  // push a random direction of arrows into a list
  // base the number of arrows in list by the number of times the user has done the thing correctly
  // max number of arrows should be like six or seven no matter how many wins.
  if (wins < 3) {
    arrows = createListOfRandomArrows(3)
  } else if (wins > 3 && wins < 5) {
    arrows = createListOfRandomArrows(4)
  } else if (wins > 5 && wins < 8) {
    arrows = createListOfRandomArrows(7)
  } else if (wins > 8) {
    arrows = createListOfRandomArrows(8)
  } else {
    arrows = createListOfRandomArrows(3)
  }

  return arrows
}
