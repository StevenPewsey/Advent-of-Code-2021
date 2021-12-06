import { getInput, getNumberOfFishesAfterDayN } from "./day6"

test("part 1 example input", () => {
  const lanternfishes = getInput("day6/exampleInput.txt")
  expect(getNumberOfFishesAfterDayN(lanternfishes, 80)).toEqual(5934)
})

test("part 1 real", () => {
  const lanternfishes = getInput("day6/realInput.txt")
  console.log(getNumberOfFishesAfterDayN(lanternfishes, 80))
})

test("part 2 real", () => {
  const start = new Date().getTime()

  const lanternfishes = getInput("day6/realInput.txt")
  const numberOfFishes = getNumberOfFishesAfterDayN(lanternfishes, 256)

  const end = new Date().getTime()

  console.log("Execution time: ", end - start)

  console.log(numberOfFishes)
})
