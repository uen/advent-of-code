const fs = require('fs')

var input = fs.readFileSync('4.txt', 'utf8').trim()

var isValid = (input) => {
	var words = input.split(" ")
	for(var a = 0; a < words.length; a++){
		for(var b=0; b < words.length; b++){
			if(a!=b && words[a]==words[b])
				return false
		}
	}

	return true
}

var lines = input.split("\n");
var validLines = 0;
lines.forEach((line) => {
	console.log(line, isValid(line))
	validLines += (isValid(line) ? 1 : 0);
})

console.log(validLines);
