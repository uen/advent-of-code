const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n\n");

const passports = input
  .map((passport) => passport.match(/(\S*):(\S*)/g))
  .filter((passport) => passport)
  .map((passport) =>
    passport.map((field) => field.split(":").reduce((a, b) => ({ [a]: b })))
  )
  .map((passport) => passport.reduce((a, b) => Object.assign(a, b)));

const digitValidator = (digits, min, max) => (val) =>
  val && val.length === digits && val >= min && val <= max;

const requiredFields = [
  {
    key: "byr",
    validator: digitValidator(4, 1920, 2002),
  },
  {
    key: "iyr",
    length: 4,
    min: 2010,
    max: 2020,
    validator: digitValidator(4, 2010, 2020),
  },
  {
    key: "eyr",
    validator: digitValidator(4, 2020, 2030),
  },
  {
    key: "hgt",
    validator: (val) => {
      const [, height, unit] = val.match(/(\d*)(\S*)/);
      return (
        ["cm", "in"].indexOf(unit) !== -1 &&
        (unit === "cm"
          ? height >= 150 && height <= 193
          : height >= 59 && height <= 76)
      );
    },
  },
  {
    key: "hcl",
    validator: (val) => !!val.match(/^(#[0-9a-f]{6,6})$/g),
  },
  {
    key: "ecl",
    validator: (val) =>
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(val) !== -1,
  },
  {
    key: "pid",
    validator: (val) => !!val.match(/^([0-9a-f]{9,9})$/g),
  },
];

const validPassports = passports.filter((passport) => {
  for (const field of requiredFields) if (!passport[field["key"]]) return false;
  return true;
});

console.log("2020/day/4/#part1:", validPassports.length);

console.log(
  "2020/day/4/#part2:",
  validPassports.filter((passport) => {
    for (const field of requiredFields)
      if (!field.validator(passport[field["key"]])) return false;

    return true;
  }).length
);
