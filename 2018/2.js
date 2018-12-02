const fs = require('fs')
const input = fs.readFileSync('data/2.txt', 'utf-8')

//2018/day/2#part1
let twoCount = 0
let threeCount = 0
input.split('\n').forEach((id) => {
	let chars = {}
	id.split('').forEach((letter) => {
		chars[letter] = chars[letter] ? chars[letter]+1 : 1;
	})

	if(Object.values(chars).indexOf(2) > -1)
		threeCount++
	if(Object.values(chars).indexOf(3) > -1)
		twoCount++
})
console.log('2018/day/2#part1:', threeCount * twoCount)


//2018/day/2#part2
let answer = 0
input.split('\n').forEach((a) => {
	let aChars = a.split('')
	input.split('\n').forEach((b) => {
		var differences = []
		let bChars = b.split('')
		var at = 0
		for(var i = 0 in aChars)
			if(aChars[i] != bChars[i]){
				at = i
				differences.push(aChars[i], bChars[i])
			}

		if(differences.length / 2 === 1){
			answer = a.slice(0, Number(at)) + a.slice(Number(at) + 1, a.length)	
		}
	})
})

console.log('2018/day/2#part2:', answer);