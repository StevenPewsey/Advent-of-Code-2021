import fs from "fs"

export const getInput = (inputPath: string) => {
  const text = fs.readFileSync(inputPath).toString()
  const textByLine = text.split("\n")

  return textByLine.map((line): ("0" | "1")[] => {
    return line.split("") as ("0" | "1")[]
  })
}

type Input = ("0" | "1")[][]

export const calculateGammaEpsilonProduct = (
  input: ("0" | "1")[][]
): number => {
  // iterate over everything
  // increment number in each column
  // get value

  const numberOf1Bits: number[] = Array(input[0].length).fill(0)

  input.forEach((row) => {
    row.forEach((bit, index) => {
      if (bit === "1") {
        numberOf1Bits[index]++
      }
    })
  })

  const finalThing = numberOf1Bits.map((bitCount) => {
    if (bitCount > Math.floor(input.length / 2)) {
      // gamma is 1, epsilon is 0
      return {
        gamma: 1,
        epsilon: 0,
      }
    } else {
      return {
        gamma: 0,
        epsilon: 1,
      }
    }
  })

  finalThing.reverse()

  let gamma = 0
  let epsilon = 0

  finalThing.forEach(({ gamma: _gamma, epsilon: _epsilon }, index) => {
    gamma += _gamma * 2 ** index
    epsilon += _epsilon * 2 ** index
  })

  return gamma * epsilon
}

const calculateNumberOf1Bits = (input: Input, column: number) => {
  let numberOf1Bits = 0

  input.forEach((row) => {
    if (row[column] === "1") {
      numberOf1Bits++
    }
  })

  return numberOf1Bits
}

const calculateOxygenBitToFilterOn = (
  numberOf1Bits: number,
  numberOfBits: number
): "0" | "1" => {
  // To find oxygen generator rating, determine the most common value (0 or 1) in
  // the current bit position

  const numberOf0Bits = numberOfBits - numberOf1Bits

  // If 0 and 1 are equally common, keep values with a 1
  if (numberOf1Bits === numberOf0Bits) return "1"

  return numberOf1Bits > numberOf0Bits ? "1" : "0"
}

const calculateCarbonBitToFilterOn = (
  numberOf1Bits: number,
  numberOfBits: number
): "0" | "1" => {
  // To find CO2 scrubber rating, determine the least common value (0 or 1) in
  // the current bit position

  const numberOf0Bits = numberOfBits - numberOf1Bits

  // If 0 and 1 are equally common, keep values with a 0
  if (numberOf1Bits === numberOf0Bits) return "0"

  return numberOf1Bits > numberOf0Bits ? "0" : "1"
}

const calculateOxygenRatingRow = (
  input: Input,
  column: number
): ("0" | "1")[] => {
  // base case
  if (input.length === 1) {
    return input[0]
  }

  const numberOf1Bits = calculateNumberOf1Bits(input, column)

  const bitToFilterOn = calculateOxygenBitToFilterOn(
    numberOf1Bits,
    input.length
  )

  const newInput = input.filter((row) => row[column] === bitToFilterOn)

  return calculateOxygenRatingRow(newInput, column + 1)
}

const calculateCarbonRatingRow = (
  input: Input,
  column: number
): ("0" | "1")[] => {
  // base case
  if (input.length === 1) {
    return input[0]
  }

  const numberOf1Bits = calculateNumberOf1Bits(input, column)

  const bitToFilterOn = calculateCarbonBitToFilterOn(
    numberOf1Bits,
    input.length
  )

  const newInput = input.filter((row) => row[column] === bitToFilterOn)

  return calculateCarbonRatingRow(newInput, column + 1)
}

const convertBinaryToDecimal = (input: ("0" | "1")[]): number => {
  return input
    .slice()
    .reverse()
    .reduce((acc, value, index) => {
      const columnValue = Number(value) * 2 ** index
      return (acc += columnValue)
    }, 0)
}

export const calculateLifeSupportRating = (input: Input): number => {
  const oxygenRow = calculateOxygenRatingRow(input, 0)
  const carbonRow = calculateCarbonRatingRow(input, 0)

  const oxygenRating = convertBinaryToDecimal(oxygenRow)
  const carbonRating = convertBinaryToDecimal(carbonRow)

  return oxygenRating * carbonRating
}
