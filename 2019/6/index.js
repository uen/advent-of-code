const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n").split(")");

const orbits = {}


const findPlanetOrbit = (orbit, name) => {
	Object.entries(orbit).forEach([key, value], => {
		if(value.name === name) return value;
		findPlanetOrbit(value.orbits, planet);
	})
}
