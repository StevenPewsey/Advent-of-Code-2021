import { getNumberOfIncreases, getSlidingWindowNumberOfIncreases } from "./day1"

const exampleInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

test("should return the correct thing", () => {
  expect(getNumberOfIncreases(exampleInput)).toEqual(7)
})

test("sliding window", () => {
  expect(getSlidingWindowNumberOfIncreases(exampleInput)).toEqual(5)
})
