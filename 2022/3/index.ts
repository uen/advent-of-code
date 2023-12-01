import fs from "fs";
import { chunk } from "lodash";

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const chunkedInput = input.map((items) => chunk(items, items.length / 2));

const backpacks = chunkedInput.map((backpack) =>
  backpack.map((section) =>
    section.reduce((acc, item) => {
      // @ts-ignore
      acc[item] = acc[item] ? acc[item] + 1 : 1;

      return acc;
    }, {})
  )
);

const groupedBackpacks = chunk(input, 3).map((group) => {
  return group.map((items) =>
    items.split("").reduce(
      // @ts-ignore
      (acc, curr) => ({ ...acc, [curr]: acc[curr] ? acc[curr] + 1 : 1 }),
      {}
    )
  );
});

const calculate = (
  sectionCount: number,
  backpacks: Record<string, number>[][]
) => {
  return backpacks
    .map((backpack) => {
      const section: Record<string, number> = backpack[0];
      return Object.keys(section).filter((item) => {
        for (let i = 1; i < sectionCount; i++) {
          if (!backpack[i][item]) {
            return false;
          }
        }

        return true;
      });
    })
    .filter((section) => section.length)
    .flat()
    .map((letter) => {
      const code = letter.charCodeAt(0);
      if (code >= 97) return code - 96;

      return letter.charCodeAt(0) - 38;
    })
    .reduce((acc, item) => acc + item, 0);
};

console.log("2022/day/3/#part1:", calculate(2, backpacks));
console.log("2022/day/3/#part2:", calculate(3, groupedBackpacks));
