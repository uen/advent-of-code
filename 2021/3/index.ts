import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const calculateRate = (values: string[], flip: boolean): number => {
  const bits: number[] = [];
  const [firstValue] = values;
  for (let i = 0; i < firstValue.length; i++) {
    const sum = values.reduce((acc, curr) => {
      return acc + (Number(curr[i]) > 0 ? -1 : 1) * (flip ? -1 : 1);
    }, 0);
    bits.push(sum > 0 ? 0 : 1);
  }

  return parseInt(bits.join(""), 2);
};

const gammaRate = calculateRate(input, false);
const epsilonRate = calculateRate(input, true);

console.log("2021/day/3/#part1:", gammaRate * epsilonRate);

const calculateMostSignificantBit = (values: string[], flip?: boolean) => {
  const mostSignificantValue = values.reduce(
    (acc, curr) => acc + (Number(curr[0]) > 0 ? 1 : -1),
    0
  );

  if (mostSignificantValue === 0) return flip ? 0 : 1;
  if (flip) return mostSignificantValue <= 0 ? 1 : 0;

  return mostSignificantValue <= 0 ? 0 : 1;
};

const calculateRating = (values: string[], flip?: boolean) => {
  const calculate = (values: string[][]): string[][] => {
    const mostSignificantBit = calculateMostSignificantBit(
      values.map(([value]) => value),
      flip
    );

    const filteredValues = values.filter(([value]) => {
      return Number(value[0]) === mostSignificantBit;
    });

    if (filteredValues.length === 1) return filteredValues;

    return calculate(
      filteredValues.map(([val, original]) => [val.slice(1), original])
    );
  };

  return parseInt(calculate(values.map((value) => [value, value]))[0][1], 2);
};

const oxygenRating = calculateRating(input, false);
const co2Rating = calculateRating(input, true);

console.log("2021/day/3/#part2", oxygenRating * co2Rating);
