import {
  calculateGammaEpsilonProduct,
  calculateLifeSupportRating,
  getInput,
} from "./day3"

test("example", () => {
  const input = getInput("day3/exampleInput.txt")
  expect(calculateGammaEpsilonProduct(input)).toEqual(198)
})

test("actual", () => {
  const input = getInput("day3/realInput.txt")
  console.log(calculateGammaEpsilonProduct(input))
})

test("example part 2", () => {
  const input = getInput("day3/exampleInput.txt")
  expect(calculateLifeSupportRating(input)).toEqual(230)
})

test("part 2 real", () => {
  const input = getInput("day3/realInput.txt")
  console.log(calculateLifeSupportRating(input))
})
