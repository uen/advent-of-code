import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split(",").map(Number);

const getFishCountForDays = (days: number): number => {
  const fishCount: number[] = [];
  for (let regenerationRate = 8; regenerationRate > 0; regenerationRate--) {
    fishCount[regenerationRate] = input.filter(
      (value) => value === regenerationRate
    ).length;
  }

  for (let day = 1; day <= days; day++) {
    const newFishes = fishCount[0] ?? 0;
    for (let i = 0; i <= 8; i++) {
      fishCount[i] = fishCount[i + 1] ?? 0;
    }

    fishCount[6] = fishCount[6] + newFishes;
    fishCount[8] = newFishes;
  }

  return fishCount.reduce((a, b) => a + b, 0);
};

console.log("2021/day/6/#part1", getFishCountForDays(80));
console.log("2021/day/6/#part2", getFishCountForDays(256));
