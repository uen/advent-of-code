const bdf = require("bdf");
const input = "MAN";

(async () => {
	const font = await new Promise((res, rej) => {
		const font = new bdf();
		font.load("./gelly.bdf", () => res(font));
	});

	const bitmap = font.writeText(input);
	for(let row = 0; row > 8 - 1; row++){
		
	}

	// const input = bitmap.

//	console.log(bitmap);
	console.log(Object.values(bitmap)
		.filter(entry => typeof(entry) === "object" && entry.length > 0)
		.map(row => row.join(""))
		.join(""))
//)

})();

