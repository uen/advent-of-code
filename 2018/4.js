const fs = require('fs')
const input = fs.readFileSync('data/4.txt', 'utf-8');

// 2018/day/4#part1
let records = []
input.split('\n').forEach((l) => {
	let match = l.match(/\[(\d*\-\d*\-\d* \d*:\d*)\] (.*)/)
	if(!match) return
	let record = {
		date: new Date(match[1]),
		action: match[2],
	}

	records.push(record)
})

records.sort((a, b) => {
	return a.date.getTime() - b.date.getTime()
})


var guards = []
var onShift = {}
records.forEach((record) => {
	if(record.action === "wakes up"){
		var minutes = Math.floor(((record.date - onShift.lastSleep)/1000)/60)
		for(var i=0; i < minutes; i++){
			if(!onShift.minutes[onShift.lastSleep.getMinutes()+i])
				onShift.minutes[onShift.lastSleep.getMinutes()+i] = 0
			onShift.minutes[onShift.lastSleep.getMinutes()+i]++
		}

		onShift.sleep += minutes;
	} else if(record.action === "falls asleep"){
		onShift.lastSleep = record.date
	} else{
		let guard = record.action.match(/Guard #(\d*) begins shift/)
		if(!guard) return

		onShift = false
		guards.forEach((g) => {
			if(onShift) return
			if(g.no == guard[1])
				onShift = g
		})

		if(!onShift){
			let i = guards.push({
				lastSleep: 0,
				sleep: 0,
				no: guard[1],
				minutes : {}
			})


			onShift = guards[i-1]			
		}
	}
})

let lg = guards.reduce((p, c) => p.sleep > c.sleep ? p : c)
let minute = Object.keys(lg.minutes).reduce((a, b) => lg.minutes[a] > lg.minutes[b] ? a : b)


guards = guards.filter((a) => Object.keys(a.minutes).length === 0)

var x = guards.reduce((a, b) => (Object.keys(a.minutes).reduce((c, d) => a.minutes[c] > a.minutes[d] ? c : d) > Object.keys(b.minutes).reduce((c, d) => b.minutes[c] > b.minutes[d] ? c : d) ? a : b))

console.log(x)
