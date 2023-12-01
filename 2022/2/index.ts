import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

enum Moves {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

enum ResponseMoves {
  X = Moves.Rock,
  Y = Moves.Paper,
  Z = Moves.Scissors,
}

const SHAPE_POINTS: any = {
  [Moves.Rock]: 1,
  [Moves.Paper]: 2,
  [Moves.Scissors]: 3,
};

const ROUND_POINTS = {
  win: 6,
  draw: 3,
  lose: 0,
};

const ROUNDS = input.length;

const LOOSING_SHAPES: any = {
  [Moves.Rock]: Moves.Paper,
  [Moves.Paper]: Moves.Scissors,
  [Moves.Scissors]: Moves.Rock,
};

const WINNING_SHAPES: any = Object.fromEntries(
  Object.entries(LOOSING_SHAPES).map((a) => a.reverse())
);

const calculate = (useOtherRules: boolean) => {
  let totalScore = 0;
  for (let i = 0; i < ROUNDS; i++) {
    const round = input[i];
    const [theirMove, myMove] = round.split(" ") as any;
    let myShape = ResponseMoves[myMove];

    if (useOtherRules) {
      if (myMove === "X") {
        myShape = WINNING_SHAPES[theirMove];
      }

      if (myMove === "Y") {
        myShape = theirMove;
      }

      if (myMove === "Z") {
        myShape = LOOSING_SHAPES[theirMove];
      }
    }

    totalScore += SHAPE_POINTS[myShape];

    if (theirMove === myShape) {
      totalScore += ROUND_POINTS.draw;
      continue;
    }

    if (
      (theirMove === Moves.Scissors && myShape === Moves.Paper) ||
      (theirMove === Moves.Paper && myShape === Moves.Rock) ||
      (theirMove === Moves.Rock && myShape === Moves.Scissors)
    ) {
      totalScore += ROUND_POINTS.lose;
      continue;
    }

    totalScore += ROUND_POINTS.win;
  }

  return totalScore;
};

console.log("2022/day/2/#part1:", calculate(false));
console.log("2022/day/2/#part2:", calculate(true));
