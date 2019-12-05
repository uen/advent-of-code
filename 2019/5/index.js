const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split(",").map(Number);

const programInput = 1
const run = (input, noun, verb) => {
	const data = [...input];
	// data[1] = noun;
	// data[2] = verb;

	const getMemory = (position) => data[position];
	console.log(data)
	const getValue = (mode, pointerPosition) => {
		const result = mode === 1 ? data[pointerPosition] : getMemory(data[pointerPosition]);
		console.log("getting", pointerPosition, "in mode", mode, "so ", result)
		return result
	}
	const setValue = (pointerPosition, value) => data[getMemory(pointerPosition)] = value;

	let pointer = 0;
	let instructions = 0;
	while(data[pointer] !== 99){
		let instructionStr = `${data[pointer]}`.padStart(5, "0");
		const modesStr = instructionStr.substring(0,3)

		const instruction = Number(instructionStr.substring(3,5))
		const modes = [modesStr[2], modesStr[1], modesStr[0]].map(mode => mode ? Number(mode) : 0);
		console.log("instructionstr:", instructionStr, "instruction:", instruction, modes, "args:", data[pointer+1], data[pointer+2]);

		if(instruction === 1){
			console.log("adding", pointer + 1, "values:", getValue(modes[0], pointer + 1), "and", getValue(modes[1], pointer + 2))
			setValue(pointer + 3, getValue(modes[0], pointer + 1) + getValue(modes[1], pointer + 2));
			pointer += 4;
		}
		else if(instruction === 2){
			console.log("multiplying at add", pointer + 1, "values:", getValue(modes[0], pointer + 1), "and", getValue(modes[1], pointer + 2))
			setValue(pointer + 3, getValue(modes[0], pointer + 1) * getValue(modes[1], pointer + 2));
			pointer += 4;
		} else if(instruction === 3){
			setValue(getValue(modes[0], pointer + 1), programInput);	
			pointer += 2;	
		} else if(instruction === 4){
			console.log("OUTPUT: ", getValue(modes[0], pointer + 1));
			data[pointer] = 99
		}
	 }

	console.log(data)

	return data[0];
}

console.log("2019/day/2/#part1:", run(input, 12, 2));

// for(let verb = 1; verb < 100; verb++){
// 	for(let noun = 1; noun < 100; noun++){
// 		const res = run(input, noun, verb);
// 		if(res === 19690720){
// 			console.log("2019/day/2/#part2:", 100 * noun + verb)
// 			return;
// 		}
// 	}
// }