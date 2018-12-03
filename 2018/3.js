const fs = require('fs')
const input = fs.readFileSync('data/3.txt', 'utf-8');

// 2018/day/3#part1
let grid = Array.from(1000, () =>Array.from(1000, () => 0));
let ids = {}
input.split('\n').forEach((rawClaim) => {
	let claim = rawClaim.match(/(#\d*) @ (\d*),(\d*): (\d*)x(\d*)/)
	if(claim)
		for(let x=claim[2]; x < Number(claim[2]) + Number(claim[4]); x++){
			for(let y=claim[3]; y < Number(claim[3]) + Number(claim[5]); y++){
				if(!grid[x]) grid[x] = []
				if(!grid[x][y]) grid[x][y] = 0
				grid[x][y]++
			}
		}
})
console.log('2018/day/3#part1:', [].concat.apply([], grid).filter((x) => x > 1).length)