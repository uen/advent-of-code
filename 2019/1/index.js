const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf-8").split("\n");

const fuelRequirement = (mass) => Math.floor(mass / 3) - 2;

const totalFuelRequirement = data
	.map(fuelRequirement)
	.reduce((a, b) => a + b);

console.log("2019/day/1/#part1:", totalFuelRequirement);

const massFuelRequirement = data
	.map((mass) => {
		let totalFuel = 0;

		for(let fuel = fuelRequirement(mass); fuel> 0; fuel = fuelRequirement(fuel))
			totalFuel += fuel;

		return totalFuel;
	})
	.reduce((a, b) => a + b);

console.log("2019/day/1/#part2:", massFuelRequirement);