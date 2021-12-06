import fs from "fs"

type Coordinate = { x: number; y: number }
type Line = {
  start: Coordinate
  end: Coordinate
}

export const getInput = (inputPath: string): Line[] => {
  const text = fs.readFileSync(inputPath).toString()

  const textByLine = text.split("\n")

  return textByLine.map((line): Line => {
    const stuff = line.match(/(\d+,\d+) -> (\d+,\d+)/)

    const start = stuff[1].split(",").map(Number) as [number, number]
    const end = stuff[2].split(",").map(Number) as [number, number]

    return {
      start: {
        x: start[0],
        y: start[1],
      },
      end: {
        x: end[0],
        y: end[1],
      },
    }
  })
}

export const calculateNumberWithMultipleOverLaps = (lines: Line[]): number => {
  let maxX = 0
  let maxY = 0

  lines.forEach(({ start, end }) => {
    if (start.x > maxX) {
      maxX = start.x
    }

    if (end.x > maxX) {
      maxX = end.x
    }

    if (start.y > maxY) {
      maxY = start.y
    }

    if (end.y > maxY) {
      maxY = end.y
    }
  })

  const horizontalLines = lines.filter(
    ({ start, end }) => start.y === end.y //&& start.x !== start.y
  )
  const verticalLines = lines.filter(
    ({ start, end }) => start.x === end.x //&& start.y !== end.y
  )

  const markedCoordinates = Array(maxY + 1)
    .fill(null)
    .map(() =>
      Array(maxX + 1)
        .fill(null)
        .map(() => 0)
    )

  let numIncrements = 0

  horizontalLines.forEach(({ start, end }) => {
    const yCoordinate = start.y

    const [startX, endX] = [start.x, end.x].sort(function (a, b) {
      return a - b
    })

    for (let xCoordinate = startX; xCoordinate < endX + 1; xCoordinate++) {
      numIncrements++
      markedCoordinates[yCoordinate][xCoordinate] += 1
    }
  })

  verticalLines.forEach(({ start, end }) => {
    const xCoordinate = start.x

    const [startY, endY] = [start.y, end.y].sort(function (a, b) {
      return a - b
    })

    for (let yCoordinate = startY; yCoordinate < endY + 1; yCoordinate++) {
      numIncrements++
      markedCoordinates[yCoordinate][xCoordinate] += 1
    }
  })

  let count = 0

  markedCoordinates.forEach((row) => {
    row.forEach((cell) => {
      if (cell > 1) {
        count += 1
      }
    })
  })

  return count
}

export const calculateNumberWithMultipleOverLapsDiagonal = (
  lines: Line[]
): number => {
  let maxX = 0
  let maxY = 0

  lines.forEach(({ start, end }) => {
    if (start.x > maxX) {
      maxX = start.x
    }

    if (end.x > maxX) {
      maxX = end.x
    }

    if (start.y > maxY) {
      maxY = start.y
    }

    if (end.y > maxY) {
      maxY = end.y
    }
  })

  const isHorizontal = ({ start, end }) => start.y === end.y
  const isVertical = ({ start, end }) => start.x === end.x

  const horizontalLines = lines.filter(isHorizontal)
  const verticalLines = lines.filter(isVertical)
  const diagonalLines = lines.filter(
    (line) => !isHorizontal(line) && !isVertical(line)
  )

  const markedCoordinates = Array(maxY + 1)
    .fill(null)
    .map(() =>
      Array(maxX + 1)
        .fill(null)
        .map(() => 0)
    )

  horizontalLines.forEach(({ start, end }) => {
    const yCoordinate = start.y

    const [startX, endX] = [start.x, end.x].sort(function (a, b) {
      return a - b
    })

    for (let xCoordinate = startX; xCoordinate < endX + 1; xCoordinate++) {
      markedCoordinates[yCoordinate][xCoordinate] += 1
    }
  })

  verticalLines.forEach(({ start, end }) => {
    const xCoordinate = start.x

    const [startY, endY] = [start.y, end.y].sort(function (a, b) {
      return a - b
    })

    for (let yCoordinate = startY; yCoordinate < endY + 1; yCoordinate++) {
      markedCoordinates[yCoordinate][xCoordinate] += 1
    }
  })

  diagonalLines.forEach(({ start, end }) => {
    if (start.x < end.x) {
      let yCoordinate = start.y
      for (let xCoordinate = start.x; xCoordinate < end.x + 1; xCoordinate++) {
        markedCoordinates[yCoordinate][xCoordinate] += 1

        const shouldIncrement = end.y > start.y

        if (shouldIncrement) {
          yCoordinate++
        } else {
          yCoordinate--
        }
      }
    } else {
      let yCoordinate = start.y
      for (let xCoordinate = start.x; xCoordinate > end.x - 1; xCoordinate--) {
        markedCoordinates[yCoordinate][xCoordinate] += 1

        const shouldIncrement = end.y > start.y

        if (shouldIncrement) {
          yCoordinate++
        } else {
          yCoordinate--
        }
      }
    }
  })

  let count = 0

  markedCoordinates.forEach((row) => {
    row.forEach((cell) => {
      if (cell > 1) {
        count += 1
      }
    })
  })

  return count
}
