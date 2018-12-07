const fs = require('fs')
const input = fs.readFileSync('data/5.txt', 'utf-8').trim();

let polymers = input.split('')
const reactPolymers = (polymers) => {
    var p = []
    for(;;){
        let toRemove = {}
        for(var i in polymers){
            if(toRemove[i]) continue
            let r = polymers[i].toUpperCase() === polymers[i] ? polymers[i].toLowerCase() : polymers[i].toUpperCase()

            if(polymers[+i+1]===r){                
               toRemove[i] = true
               toRemove[+i+1] = true
            }
        }

        if(Object.keys(toRemove).length === 0) break

        let r = []
        for(var i in polymers){
            if(toRemove[i]) continue
            r.push(polymers[i])
        }

        polymers = r
    }

    return polymers
}

let removedPairsLength = reactPolymers(polymers).length
console.log('2018/day5#part1:', removedPairsLength);

let lowest = removedPairsLength
'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => {
    let problemRemoved = input.replace(new RegExp('('+c.toLowerCase()+'|'+c.toUpperCase()+')', 'g'), '').split('')
    return reactPolymers(problemRemoved).length
})
console.log('2018/day5#part2:', lowest)
