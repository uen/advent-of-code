var input = `5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6`

var banks = input.trim().split("\t").map((a) => {return parseInt(a)})
var visited = []
var count = 0;

do{
	count++;
	var chosenBlock = (banks.reduce((max, x, i, arr) => x > arr[max] ? i : max, 0))
	var remainingBlocks = banks[chosenBlock]
	banks[chosenBlock] = 0

	for(var i=0; i < remainingBlocks; i++){
		banks[(i+(chosenBlock+1))%banks.length] += 1;

	}

	hash = banks.reduce((a,b) => a+"-"+b, 0)
	visited.push(hash)
} while(visited.indexOf(hash)==visited.length-1)
console.log(hash);
console.log(count);
