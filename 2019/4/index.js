const fs = require("fs");
const [minRange, maxRange] = fs.readFileSync("input.txt", "utf-8").split("-")

const validRegex = /^(0*1*2*3*4*5*6*7*8*9*$)/
const checkValidity = (number, singleRepeating) => {
	if(!validRegex.test(number)) return [false, false];

	const repeatingDigits = {};
	for(let i = 0; i < number.length; i++)
		if(number[i] === number[i+1])
			repeatingDigits[number[i]] = repeatingDigits[number[i]] ? repeatingDigits[number[i]] + 1 : 1;

	return [
		Object.keys(repeatingDigits).filter(digit => repeatingDigits[digit] === 1).length > 0,
		Object.keys(repeatingDigits).length > 0
	]
}

let possibleCombinations = 0;
let possibleCombinationsSingleRepeating = 0;
 for(let i=minRange; i < maxRange; i++){
	const [validSingleRepeating, validTotal] = checkValidity(`${i}`);
	
	if(validSingleRepeating) possibleCombinationsSingleRepeating++;
	if(validTotal) possibleCombinations++;
 }

console.log("2019/day/4/#part1:", possibleCombinations);
console.log("2019/day/4/#part2:", possibleCombinationsSingleRepeating);