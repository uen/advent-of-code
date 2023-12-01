

const fs = require("fs");
const bdf = require("bdf");
const input = "WELL DONE";

(async () => {
	const font = await new Promise((res, rej) => {
		const font = new bdf();
		font.load("./x.bdf", () => res(font));
	});

	const bitmap = font.writeText(input, {width: 10, height: 10});


	// const input = bitmap.

//	console.log(bitmap);
	const values = Object.values(bitmap)
		.filter(entry => typeof(entry) === "object" && entry.length > 0)
		.map(row => row.join("")).join("").split("")

	// Split the array into X layers

	// console.log(values.length/2);
	const tall = 8;
const wide = values.length / tall;

console.log({tall, wide});


console.log(values);
	// values is the first layer
	const topLayer = values.map(a => '2');
	const bottomLayer = values.map(a => '0');
	
	for(let x = 0; x < values.length; x++){
		// layers[layer][y] = []
			const seed = Math.random()
			if(seed > 0.4 && values[x] === '0'){
				values[x] = '2'
				topLayer[x] = '2'
				bottomLayer[x] = '0'
			} else if(seed < 0.6 && values[x] === '1'){
				topLayer[x] = '1'
				values[x] = '2'
				bottomLayer[x] = '1';
			} else if(seed < 0.2 && values[x] === '0'){
				topLayer[x] = '0';
				values[x] = '2'
				bottomLayer[x] = '2'
			}
			// layers[layer][y].push(input[layerStart + x + (y * wide)]);
	}

	
	// Fill it in with

		// Replace some upper layers with bullshit


const result = topLayer.join("") + values.join("") + bottomLayer.join("");

console.log(result);

		// fs.writeFileSync("../input-custom.txt", values);
		fs.writeFileSync("../input-custom.txt", result);
//)

})();
