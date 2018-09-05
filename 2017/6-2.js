var input = `5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6`
//var input = `2	4	1	2`
//var input = `0	2	7	0`
var nextOccurance = (inputx) => {
	var count = 0;
	var visited = []
	var banks = inputx.trim().split("\t").map((a) => {return parseInt(a)})

	do{
		count++;
		var chosenBlock = (banks.reduce((max, x, i, arr) => x > arr[max] ? i : max, 0))
		var remainingBlocks = banks[chosenBlock]
		banks[chosenBlock] = 0

		for(var i=0; i < remainingBlocks; i++){
			banks[(i+(chosenBlock+1))%banks.length] += 1;
		}
		hash = banks.reduce((a,b) => a+'\t'+b)
		hash = hash.trim();
		visited.push(hash)
	} while(visited.indexOf(hash)==visited.length-1)
	return {count, hash};
}


console.log(
	nextOccurance(
		nextOccurance(input).hash
	).count -1
)
