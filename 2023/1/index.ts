import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

const REPLACE_VALUES: Record<any, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const replacedInput = input.map((line) => {
  let newLine = [...line];

  let cursor = 0;
  while (cursor <= newLine.length) {
    const lineValueCursor = newLine.slice(0, cursor).join("");

    for (const key of Object.keys(REPLACE_VALUES)) {
      if (lineValueCursor.includes(key)) {
        newLine[cursor - key.length] = `${REPLACE_VALUES[key]}`;
      }
      continue;
    }

    cursor++;
  }

  return newLine.join("");
});

const calculateValues = (values: string[]) => {
  const calibrationValues: number[] = [];

  for (const line of values) {
    const numbers = line
      .split("")
      .filter((char) => !Number.isNaN(Number(char)));

    const first = numbers[0];
    const last = numbers.pop();
    const calibrationValue = Number(`${first}${last}`);
    calibrationValues.push(calibrationValue);
  }

  return calibrationValues.reduce((a, b) => a + b, 0);
};

console.log("2023/day/1/#part1:", calculateValues(input));
console.log("2023/day/1/#part2:", calculateValues(replacedInput));
