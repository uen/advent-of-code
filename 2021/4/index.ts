import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split("\n");
const BOARD_SIZE = 5;

const [numbersString, ...boardsString] = input;
type BoardType = number[][];

const numbers = numbersString.split(",").map(Number);
const boards: BoardType[] = boardsString
  .filter((value) => value)
  .map((boardString) =>
    boardString
      .split(" ")
      .filter((value) => value)
      .map(Number)
  )
  .reduce((chunks: number[][][], item: number[], index) => {
    const chunk = Math.floor(index / BOARD_SIZE);
    chunks[chunk] = [...(chunks[chunk] || []), item];
    return chunks;
  }, []);

const hasCompleteRow = (board: BoardType, numbers: number[]) => {
  return !!board.find(
    (row) =>
      row.filter((number) => numbers.indexOf(number) !== -1).length >=
      BOARD_SIZE
  );
};

const hasCompleteColumn = (board: BoardType, numbers: number[]) => {
  return hasCompleteRow(
    board[0].map((x, i) => board.map((x) => x[i])),
    numbers
  );
};

const calculateUndrawnSum = (board: BoardType, numbers: number[]) => {
  return board
    .flat()
    .filter((number) => numbers.indexOf(number) === -1)
    .reduce((acc, curr) => acc + curr, 0);
};

const getWinningBoards = (
  boards: BoardType[],
  numbers: number[]
): number[][] => {
  const previousNumbers: number[] = [];
  const winningBoards: number[][] = [];
  for (const number of numbers) {
    previousNumbers.push(number);

    boards
      .map((board, index) => ({ board, index }))
      .filter(({ board, index }) => {
        return (
          !winningBoards.find(([boardIndex]) => boardIndex === index) &&
          (hasCompleteRow(board, previousNumbers) ||
            hasCompleteColumn(board, previousNumbers))
        );
      })
      .forEach((winner) => {
        winningBoards.push([winner.index, number]);
      });
  }
  return winningBoards || [];
};

const winners = getWinningBoards(boards, numbers);

const calculateAnswer = (winners: number[][], index: number) => {
  const [boardIndex, number] = winners[index];

  return (
    calculateUndrawnSum(
      boards[boardIndex],
      numbers.slice(0, numbers.indexOf(winners[index][1]) + 1)
    ) * number
  );
};

const firstWinner = calculateAnswer(winners, 0);
const lastWinner = calculateAnswer(winners, winners.length - 1);

console.log("2021/day/4/#part1", firstWinner);
console.log("2021/day/4/#part2", lastWinner);
