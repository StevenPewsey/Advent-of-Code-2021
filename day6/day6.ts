import fs from "fs"

const generateDayNumberMap = (
  numberOfDays: number
): Record<number, Record<number, number>> => {
  const map = {
    0: {
      0: 1,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
    },
  }

  for (let day = 1; day < numberOfDays + 1; day++) {
    map[day] = {
      0: map[day - 1][6] + map[day - 1][8],
      1: map[day - 1][0],
      2: map[day - 1][1],
      3: map[day - 1][2],
      4: map[day - 1][3],
      5: map[day - 1][4],
      6: map[day - 1][5],
      7: map[day - 1][6],
      8: map[day - 1][7],
    }
  }

  return map
}

export const getNumberOfFishesAfterDayN = (
  lanternfishes: number[],
  numberOfDays: number
): number => {
  const dayNumberMap = generateDayNumberMap(numberOfDays)

  return lanternfishes.reduce((acc, fishTimer) => {
    return acc + dayNumberMap[numberOfDays][fishTimer]
  }, 0)
}

export const getInput = (inputPath: string): number[] => {
  const text = fs.readFileSync(inputPath).toString()

  const timers = text.split(",")

  return timers.map(Number)
}
