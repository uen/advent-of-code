const fs = require('fs');

var input = fs.readFileSync('5.txt', 'utf8')
	.trim()
	.split("\n")
	.map(item => {return parseInt(item)})

var step = 0;
var count = 1;

do{
	count++;
	var v = input[step] >= 3 ? -1 : 1; 
	input[step]+=v;
	step += input[step]-v;
} while(input[step + input[step]] !== undefined)

console.log(count);
