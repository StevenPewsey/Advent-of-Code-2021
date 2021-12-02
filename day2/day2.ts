import fs from "fs"

export const getInput = (inputPath: string) => {
  const text = fs.readFileSync(inputPath).toString()
  const textByLine = text.split("\n")

  return textByLine.map((line): [string, number] => {
    const [direction, magnitude] = line.split(" ")
    return [direction, Number(magnitude)]
  })
}

export const calculateHorizontalTimesDepth = (
  input: [string, number][],
  withAim = false
): number => {
  let horizontal = 0
  let depth = 0
  let aim = 0

  input.forEach((inputRow) => {
    const [direction, magnitude] = inputRow

    if (direction === "forward") {
      horizontal += magnitude

      if (withAim && aim !== 0) {
        depth += magnitude * aim
      }
    } else if (direction === "down") {
      if (!withAim) {
        depth += magnitude
      }

      aim += magnitude
    } else {
      if (!withAim) {
        depth -= magnitude
      }
      aim -= magnitude
    }
  })

  return horizontal * depth
}
