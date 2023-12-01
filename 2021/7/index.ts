import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split(",").map(Number);

const factorialSum = (start: number, end: number) => {
  let sum = 0;
  for (let i = 0; i <= Math.abs(start - end); i++) {
    sum += i;
  }

  return sum;
};

function lowestFuel(position: number, previous?: number): number {
  let result = input.reduce(
    (acc, curr) => acc + factorialSum(curr, position),
    0
  );

  if (previous && result >= previous) return previous;
  return lowestFuel(position + 1, result);
}

const median = input.sort((a, b) => (a > b ? -1 : 1))[
  Math.floor((input.length - 1) / 2)
];

const lowestRegularFuel = input
  .map((position) => Math.abs(position - median))
  .reduce((acc, curr) => acc + curr);

console.log("2021/day/7/#part1", lowestRegularFuel);
console.log("2021/day/7/#part2", lowestFuel(median));
