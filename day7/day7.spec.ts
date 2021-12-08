import { getCheapestPosition, getInput } from "./day7"

test("part 1 example", () => {
  const input = getInput("day7/exampleInput.txt")
  expect(getCheapestPosition(input)).toEqual(37)
})

test("part 1 real", () => {
  const input = getInput("day7/realInput.txt")
  console.log(getCheapestPosition(input))
})

test("part 2 example", () => {
  const input = getInput("day7/exampleInput.txt")
  expect(getCheapestPosition(input, true)).toEqual(168)
})

test("part 2 real", () => {
  const input = getInput("day7/realInput.txt")
  console.log(getCheapestPosition(input, true))
})
