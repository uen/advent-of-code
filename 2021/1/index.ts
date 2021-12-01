import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split("\n").map(Number);

const largerMeasurements = input
  .reduce((chunks: number[][], item: number, index) => {
    const chunk = Math.floor(index / 3);
    chunks[chunk] = [...(chunks[chunk] || []), item];
    return chunks;
  }, [])
  .filter((value) => value.length === 3)
  .map((value) => value.reduce((prev, current) => prev + current))
  .reduce((acc, curr, index) => acc + (curr > input[index - 1] ? 1 : 0), 0);

console.log("2021/day/1/#part1:", largerMeasurements);

const depthCount = input.reduce((currentDepthCount, currentValue, index) => {
  const previousSum = input[index - 1] + currentValue + input[index + 1];
  const currentSum = currentValue + input[index + 1] + input[index + 2];

  return currentSum > previousSum ? currentDepthCount + 1 : currentDepthCount;
}, 0);

console.log("2021/day/1/#part2:", depthCount);
