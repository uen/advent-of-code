import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split("\n");
const groups = input.map((line) => line.split(","));

let fullOverlapCount = 0;
let partialOverlapCount = 0;
groups.map((group) => {
  const elfAssignments = group.map((assignment) =>
    assignment.split("-").map((item) => Number(item))
  );

  const [aStart, aEnd] = elfAssignments[0];
  const [bStart, bEnd] = elfAssignments[1];

  if (!(aStart > bEnd || bStart > aEnd)) {
    partialOverlapCount++;
  }

  if (
    (aStart >= bStart && aEnd <= bEnd) ||
    (bStart >= aStart && bEnd <= aEnd)
  ) {
    fullOverlapCount++;
  }
});

console.log("2022/day/4/#part1:", fullOverlapCount);
console.log("2022/day/4/#part2:", partialOverlapCount);
