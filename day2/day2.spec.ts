import { calculateHorizontalTimesDepth, getInput } from "./day2"

test("example should return correct value", () => {
  const input = getInput("day2/exampleInput.txt")
  expect(calculateHorizontalTimesDepth(input)).toEqual(150)
})

test("example part 2", () => {
  const input = getInput("day2/exampleInput.txt")
  expect(calculateHorizontalTimesDepth(input, true)).toEqual(900)
})

test("actual", () => {
  const input = getInput("day2/realInput.txt")
  console.log(calculateHorizontalTimesDepth(input))
  console.log(calculateHorizontalTimesDepth(input, true))
})
