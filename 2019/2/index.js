const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split(",").map(Number);

const run = (input, noun, verb) => {
	const data = [...input];
	data[1] = noun;
	data[2] = verb;

	const getMemory = (position) => data[position];
	const getValue = (pointerPosition) => getMemory(data[pointerPosition]);
	const setValue = (pointerPosition, value) => data[getMemory(pointerPosition)] = value;

	let pointer = 0;
	while(data[pointer] !== 99){
		if(data[pointer] === 1){
			setValue(pointer + 3, getValue(pointer + 1) + getValue(pointer + 2));
			pointer += 4
		} else if(data[pointer] === 2){
			setValue(pointer + 3, getValue(pointer + 1) * getValue(pointer + 2));
			pointer += 4
		}
	}

	return data[0];
}

console.log("2019/day/2/#part1:", run(input, 12, 2));



for(let verb = 1; verb < 100; verb++){
	for(let noun = 1; noun < 100; noun++){
		const res = run(input, noun, verb);
		if(res === 19690720){
			console.log("2019/day/2/#part2:", 100 * noun + verb)
			return;
		}
	}
}