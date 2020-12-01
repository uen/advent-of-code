const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(Number);

const yearNumbers = (input, triple) => {
  for (let e1 of input) {
    for (let e2 of input) {
      if (!triple && e1 + e2 === 2020) {
        return [e1, e2];
      } else if (triple) {
        for (let e3 of input) {
          if (e1 + e2 + e3 === 2020) {
            return [e1, e2, e3];
          }
        }
      }
    }
  }
};

const [e1p1, e2p1] = yearNumbers(input);
console.log("2020/day/1/#part1:", e1p1 * e2p1);

const [e1p2, e2p2, e3p2] = yearNumbers(input, true);
console.log("2020/day/1/#part2:", e1p2 * e2p2 * e3p2);
