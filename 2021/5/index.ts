import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

interface Vector {
  x: number;
  y: number;
}

type GridType = number[][];

const placeGridPoint = (grid: GridType, point: Vector) => {
  if (!grid[point.y]) grid[point.y] = [];
  grid[point.y][point.x] = (grid[point.y][point.x] ?? 0) + 1;
};

const getStep = (direction: number) =>
  direction === 0 ? 0 : direction > 0 ? 1 : -1;

const drawLine = (
  grid: GridType,
  from: Vector,
  to: Vector,
  allowDiagonal?: boolean
) => {
  if (!allowDiagonal && from.x !== to.x && from.y !== to.y) return;

  const directionX = to.x - from.x;
  const directionY = to.y - from.y;

  const stepCount = Math.max(Math.abs(directionX), Math.abs(directionY)) + 1;
  const stepX = getStep(directionX);
  const stepY = getStep(directionY);

  for (
    let stepNumber = 0, x = from.x, y = from.y;
    stepNumber < stepCount;
    stepNumber++
  ) {
    placeGridPoint(grid, { x, y });
    x += stepX;
    y += stepY;
  }
};

const lines = input.map((line) =>
  line
    .split(" -> ")
    .map((vector) => vector.split(",").map(Number))
    .map(([x, y]) => ({ x, y }))
);

const drawLines = (grid: GridType, allowDiagonal: boolean) => {
  lines.forEach(([from, to]) => {
    drawLine(grid, from, to, allowDiagonal);
  });
};

const part1Grid: GridType = [];
const part2Grid: GridType = [];
drawLines(part1Grid, false);
drawLines(part2Grid, true);

const countOverlappoingPoints = (grid: GridType) =>
  grid.flat().filter((line) => line > 1).length;

console.log("2021/day/5/#part1", countOverlappoingPoints(part1Grid));
console.log("2021/day/5/#part2", countOverlappoingPoints(part2Grid));
