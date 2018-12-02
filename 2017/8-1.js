var fs = require('fs');
var input = fs.readFileSync('8.txt', 'utf8').trim()
//var input = `b inc 5 if a > 1
//a inc 1 if b < 5
//c dec -10 if a >= 1
//c inc -20 if c == 10`

var maxRegister = 0;

var variables = {}
var operators = {
	'>' :  (a,b) => { return a > b },
	'<' :  (a,b) => { return a < b },
	'>=':  (a,b) => { return a >= b },
	'<=':  (a,b) => { return a <= b },
	'!=':  (a,b) => { return a != b },
	'==':  (a,b) => { return a == b },
	'inc': (b,a) => { return a + b },
	'dec': (b,a) => { return b - a }
}

input.trim().split("\n").forEach((raw) => {
	var instruction = raw.match(/([a-z]*) (...) (-?\d+) if ([a-z]*) (.*) (-?\d+)/)
	var variable 		= instruction[1]
	var incDec		= instruction[2]
	var amount 		= parseInt(instruction[3])
	var conditionVar 	= instruction[4]
	var conditionOperator 	= instruction[5]
	var conditionValue 	= parseInt(instruction[6])

	if(variables[variable]===undefined) variables[variable] = 0;
	if(variables[conditionVar]===undefined) variables[conditionVar] = 0;

	if(operators[conditionOperator](variables[conditionVar], conditionValue))
		variables[variable] = operators[incDec](variables[variable], amount)

	maxRegister = Math.max(variables[variable], maxRegister)
})

console.log(Math.max(...Object.values(variables)))
console.log(maxRegister);
