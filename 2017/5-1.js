const fs = require('fs');

var input = fs.readFileSync('5.txt', 'utf8')
	.trim()
	.split("\n")
	.map(item => {return parseInt(item)})

var step = 0;
var count = 1;

do{
	count++;
	input[step]+=1;
	step += input[step]-1;
} while(input[step + input[step]] !== undefined)

console.log(count);
