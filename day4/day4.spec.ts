import { calcLastRemainingBoardScore, calculateScore, getInput } from "./day4"

test("part 1 example", () => {
  const { numbers, bingoBoards } = getInput("day4/exampleInput.txt")

  expect(numbers).toEqual([
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
    20, 8, 19, 3, 26, 1,
  ])

  expect(calculateScore(numbers, bingoBoards)).toEqual(4512)
})

test("part 2 example", () => {
  const { numbers, bingoBoards } = getInput("day4/exampleInput.txt")

  expect(numbers).toEqual([
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
    20, 8, 19, 3, 26, 1,
  ])

  expect(calcLastRemainingBoardScore(numbers, bingoBoards)).toEqual(1924)
})

test("part 1 real", () => {
  const { numbers, bingoBoards } = getInput("day4/realInput.txt")

  console.log(calculateScore(numbers, bingoBoards))
})

test("part 2 real", () => {
  const { numbers, bingoBoards } = getInput("day4/realInput.txt")

  console.log(calcLastRemainingBoardScore(numbers, bingoBoards))
})
