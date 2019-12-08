const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const image = input.split("");

const wide = 25;
const tall = 6;

const layers = []
let layer = 0;
while(layer !== image.length / (wide * tall)){
	const layerStart = layer * wide * tall;
	if(!layers[layer]) layers[layer] = [];
	for(let y = 0; y < tall; y++){
		layers[layer][y] = []
		for(let x = 0; x < wide; x++){
			layers[layer][y].push(input[layerStart + x + (y * wide)]);
		}
	}

	layer++;
}

const lowestZeroLayer = layers
.map((layer) => [].concat.apply([], layer))
.map((layer, k) => {
	const counts = {}; 
	layer.forEach((pixel) => counts[pixel] = (counts[pixel] || 0) + 1)
	return counts; 
})
.reduce((a, b) => a['0'] < b['0'] ? a : b)

console.log("2019/day/8/#part1:", lowestZeroLayer['1'] * lowestZeroLayer['2']);

console.log("2019/day/8/#part2:");
const finalImage = layers
.reverse()
.reduce((y1, y2) => {
	const layer = [];
	for(let y = 0; y < tall; y++){
		for(let x = 0; x < wide; x++){
			if(y2[y][x] === "2") y2[y][x] = y1[y][x] 
		}
	}

	return y2;
}).forEach((yPart) => {
	console.log(yPart.map(a => a === "0" ? " " : "█").reduce((a, b) => a + b))
});

