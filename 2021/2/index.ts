import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

interface Vector {
  x: number;
  y: number;
}

interface VectorAim extends Vector {
  aim: number;
}

const currentPosition: Vector = { x: 0, y: 0 };
const currentAimPosition: VectorAim = { x: 0, y: 0, aim: 0 };

const commands: Record<string, (position: Vector, amount: number) => void> = {
  forward: (vector, value) => (vector.x += value),
  up: (vector, value) => (vector.y -= value),
  down: (vector, value) => (vector.y += value),
};

const aimCommands: Record<
  string,
  (position: VectorAim, amount: number) => void
> = {
  forward: (vector, value) => {
    vector.x += value;
    vector.y += value * vector.aim;
  },
  up: (vector, value) => (vector.aim -= value),
  down: (vector, value) => (vector.aim += value),
};

input.forEach((input) => {
  const [command, value] = input.split(" ");
  commands[command](currentPosition, Number(value));
});

console.log("2021/day/2/#part1:", currentPosition.x * currentPosition.y);

input.forEach((input) => {
  const [command, value] = input.split(" ");
  aimCommands[command](currentAimPosition, Number(value));
});

console.log("2021/day/2/#part2:", currentAimPosition.x * currentAimPosition.y);
