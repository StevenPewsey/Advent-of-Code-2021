import fs from "fs"

type BingoBoard = number[][]
type MarkedBoard = boolean[][]

export const getInput = (
  inputPath: string
): {
  numbers: number[]
  bingoBoards: BingoBoard[]
} => {
  const text = fs.readFileSync(inputPath).toString()

  const numbers = []
  const bingoBoards = []

  const textByLine = text.split("\n")

  let boardRow: number
  let boardBuffer: BingoBoard

  textByLine.map((line, index) => {
    if (index === 0) {
      numbers.push(...line.split(",").map(Number))
      return
    }

    if (line === "") {
      if (boardBuffer) {
        bingoBoards.push(boardBuffer)
      }
      boardRow = 0
      boardBuffer = Array(5).fill(Array(5))
      return
    }

    const row = line.trim().split(/\s+/).map(Number)
    boardBuffer[boardRow++] = row
  })

  bingoBoards.push(boardBuffer)

  return {
    numbers,
    bingoBoards: bingoBoards,
  }
}

const calcIsRowComplete = (board: MarkedBoard): boolean => {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex]

    // check if every column is marked
    if (row.every((column) => column)) {
      return true
    }
  }

  return false
}

const calcIsColumnComplete = (board: MarkedBoard): boolean => {
  for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
    const columnArray: boolean[] = []

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      columnArray.push(board[rowIndex][columnIndex])
    }

    if (columnArray.every((row) => row)) {
      return true
    }
  }

  return false
}

const markBoard = (
  board: BingoBoard,
  markedBoard: MarkedBoard,
  number: number
): void => {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex]

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex]
      if (cell === number) {
        markedBoard[rowIndex][columnIndex] = true
      }
    }
  }
}

const calculateUnmarkedSum = (
  board: BingoBoard,
  markedBoard: MarkedBoard
): number => {
  let count = 0

  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (!markedBoard[rowIndex][columnIndex]) {
        count += cell
      }
    })
  })

  return count
}

const createMarkedBoards = (numberOfBoards: number): MarkedBoard[] => {
  return Array(numberOfBoards)
    .fill(null)
    .map(() =>
      Array(5)
        .fill(null)
        .map(() =>
          Array(5)
            .fill(null)
            .map(() => false)
        )
    )
}

export const calculateScore = (
  numbers: number[],
  boards: BingoBoard[]
): number => {
  const markedBoards: MarkedBoard[] = createMarkedBoards(boards.length + 1)

  for (let i = 0; i < numbers.length; i++) {
    const drawnNumber = numbers[i]

    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      const board = boards[boardIndex]
      const markedBoard = markedBoards[boardIndex]

      markBoard(board, markedBoard, drawnNumber)

      const isRowComplete = calcIsRowComplete(markedBoard)
      const isColumnComplete = calcIsColumnComplete(markedBoard)

      if (isRowComplete || isColumnComplete) {
        console.log("winning number: ", drawnNumber)
        const unmarkedSum = calculateUnmarkedSum(board, markedBoard)
        return unmarkedSum * drawnNumber
      }
    }
  }

  return 0
}

export const calcLastRemainingBoardScore = (
  numbers: number[],
  boards: BingoBoard[]
): number => {
  const markedBoards: MarkedBoard[] = createMarkedBoards(boards.length + 1)

  const remainingBoards = [...boards]
  const remainingMarkedBoards = [...markedBoards]

  for (let i = 0; i < numbers.length; i++) {
    const drawnNumber = numbers[i]

    let winners: number[] = []

    for (
      let boardIndex = 0;
      boardIndex < remainingBoards.length;
      boardIndex++
    ) {
      const board = remainingBoards[boardIndex]
      const markedBoard = remainingMarkedBoards[boardIndex]

      markBoard(board, markedBoard, drawnNumber)

      const isRowComplete = calcIsRowComplete(markedBoard)
      const isColumnComplete = calcIsColumnComplete(markedBoard)

      if (isRowComplete || isColumnComplete) {
        console.log("winning number: ", drawnNumber)
        winners.push(boardIndex)

        if (remainingBoards.length === 1) {
          const unmarkedSum = calculateUnmarkedSum(board, markedBoard)
          return unmarkedSum * drawnNumber
        }
      }
    }

    winners.forEach((winningBoardIndex, index) => {
      remainingBoards.splice(winningBoardIndex - index, 1)
      remainingMarkedBoards.splice(winningBoardIndex - index, 1)
    })
  }

  return 0
}
