import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8");

const inventories = input.split("\n\n");

const totalCalories = inventories
  .map((inventory) => {
    const total = inventory
      .split("\n")
      .reduce((acc, calories) => Number(acc) + Number(calories), 0);

    return total;
  }, 0)
  .sort((a, b) => b - a);

console.log("2022/day/1/#part1:", totalCalories[0]);

const [a, b, c] = totalCalories;
console.log("2022/day/1/#part2:", a + b + c);
