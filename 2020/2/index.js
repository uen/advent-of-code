const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

const passwords = input.map((password) => {
  const match = password.match(/(\d*)-(\d*) (.): (.*)/);
  return {
    char: match[3],
    minChar: Number(match[1]),
    maxChar: Number(match[2]),
    password: match[4],
  };
});

const sledRentalValidPasswords = passwords.filter((password) => {
  const charLength = (
    password.password.match(new RegExp(password.char, "g")) || []
  ).length;

  return charLength <= password.maxChar && charLength >= password.minChar;
});

const tobogganValidPasswords = passwords.filter(
  (password) =>
    (password.password[password.minChar - 1] === password.char) ^
    (password.password[password.maxChar - 1] === password.char)
);

console.log("2020/day/2/#part1:", sledRentalValidPasswords.length);
console.log("2020/day/2/#part2:", tobogganValidPasswords.length);
