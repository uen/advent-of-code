const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

const getSquare = ({ x, y }) => {
  return input[y][x % input[y].length];
};

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const countTrees = (slope) => {
  let treeCount = 0;

  const currentPosition = { x: 0, y: 0 };
  while (currentPosition.y < input.length) {
    if (getSquare(currentPosition) === "#") treeCount++;
    currentPosition.x += slope.right;
    currentPosition.y += slope.down;
  }

  return treeCount;
};

console.log("2020/day/3/#part1:", countTrees(slopes[1]));
console.log(
  "2020/day/3/#part2:",
  slopes.map(countTrees).reduce((a, b) => a * b)
);
