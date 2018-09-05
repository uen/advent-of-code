var fs = require('fs');
var input = fs.readFileSync('23.txt', 'utf8');

var instructions = []
input.trim().split('\n').forEach((i) => {
	var raw = i.match(/(.{3}) (.*) (.*)/)

	instructions.push({
		instruction: 	raw[1],
		register:	raw[2],
		value:		parseInt(raw[3])
	})
})
var registers = {a:0, b:0, c:0, d:0, e:0, f:0, g:0, h:0}
var currentInstruction = 0

var instructionOperations = {
	'set': (x, y) => { registers[x] = registers[y] },
	'sub': (x, y) => { registers[x] -= registers[y] },
	'mul': (x, y) => { registers[x] *= registers[y] },
	'jnz': (x, y) => {
		if(x!='0'){
			currentInstruction += y;
		} else{
			currentInstruction++;
		}
	}
}

do {
	var rI = instructions[currentInstruction]
	instructionOperations[rI.instruction](rI.register, rI.value)
//	console.log(rI.instruction);
	if(rI.instruction!='jnz') currentInstruction++;

//console.log('currentInstruction:', currentInstruction)
} while(currentInstruction <= instructions.length-1)

console.log(registers);
