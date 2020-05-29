const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");

let floor = 0;
let firstEnteredBasement = 0;
input.trim().split("").forEach((step, index) => {
	if(step === "(") floor++;
	else floor--;

	if(!firstEnteredBasement && floor === -1)
		firstEnteredBasement = index + 1;
});

console.log("2015/day/1#part1:", floor);
console.log("2015/day/1#part2:", firstEnteredBasement);
