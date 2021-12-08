import fs from "fs"

export const getInput = (inputPath: string): number[] => {
  const text = fs.readFileSync(inputPath).toString()

  const positions = text.split(",")
  return positions.map(Number)
}

const calculateCost = (
  numbers: number[],
  position: number,
  increasingCost: boolean
) => {
  return numbers.reduce((acc, number) => {
    const positionsMoved = Math.abs(number - position)
    if (!increasingCost) return (acc += positionsMoved)

    return acc + (positionsMoved * (positionsMoved + 1)) / 2
  }, 0)
}

export const getCheapestPosition = (
  numbers: number[],
  increasingCost: boolean = false
): number => {
  const max = Math.max(...numbers)
  const min = Math.min(...numbers)

  const positionCostMap: Record<number, undefined | number> = {}

  for (let index = min; index < max + 1; index++) {
    positionCostMap[index] = undefined
  }

  Object.keys(positionCostMap).forEach((position) => {
    positionCostMap[position] = calculateCost(
      numbers,
      Number(position),
      increasingCost
    )
  })

  return Math.min(...Object.values(positionCostMap))
}
