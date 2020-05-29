const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").trim();

const surfaceArea = (w, h, l) => 2*l*w + 2*w*h + 2*h*l;

const presents = input.split("\n")
	.map(present =>	present
		.split("x") 			// Split into [l,w,h]
		.map(number => Number(number))	// Map to number
	)
	.map(dimension => [
		...dimension, // Add to dimension array
		dimension
			.sort((a, b) => a-b)
			.slice(0,2) // The lowest two of l,w,h
			.reduce((a,b) => [a*b, a*2 + b*2]), // Get the surface area (for extra paper) and permiter of smallest side for ribbon
		dimension
			.reduce((a,b) => a*b) // Surface area
	]);

// Add the surface area and extra paper (lowest area of smallest side)
const presentWrappingArea = presents
	.map(dimension => surfaceArea(...dimension) + dimension[3][0])
	.reduce((a, b) => a+b);

// Add the ribbon
const presentRibbon = presents
	.map(dimension => dimension[3][1] + dimension[4])
	.reduce((a, b) => a+b);

console.log("2015/day/2#part1:", presentWrappingArea)
console.log("2015/day/2#part2:", presentRibbon)
