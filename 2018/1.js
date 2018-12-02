const fs = require('fs')
const input = fs.readFileSync('data/1.txt', 'utf-8')

// 2018/day/1#part1
let frequency = 0
input.split('\n').forEach((c) => {
	var n = Number(c.substring(1))
	switch(c.charAt(0)){
		case '+':
		frequency += n
		break;
		case '-':
		frequency -= n
		break;
	}
})
console.log('2018/day/1#part1:', frequency)


// 2018/day/1#part1 (alternative)
let frequency_ = 0
input.split('\n').forEach((c) => {
	frequency_ = eval(frequency_ + c.charAt(0) + c.substring(1, c.length))
})
console.log('2018/day/1#part1:', frequency)


// 2018/day/1#part2
const inputArray = input.split('\n')
let currentFrequency = 0
let frequencies = {}

let i = 0
for(;;){
	let c = inputArray[i % inputArray.length]
	let newFreq = Number(eval(currentFrequency + c.charAt(0) + c.substring(1, c.length)))

	if(frequencies[String(newFreq)]){
		console.log('2018/day/1#part2:', newFreq)
		break
	}

	i++	
	frequencies[String(newFreq)] = true
	currentFrequency = newFreq
}



