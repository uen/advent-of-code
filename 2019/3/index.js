const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n").map(wire => wire.split(","));

const w1 = {x : 0, y : 0, steps : 0};
const w2 = {x : 0, y : 0, steps : 0};

const touch = (wire) => {
    if(touched[wire.x] && touched[wire.x][wire.y])
        intersections.push({x: wire.x, y: wire.y, count : wire.steps + touched[wire.x][wire.y]});

    if(!touched[wire.x]) touched[wire.x] = [];
    touched[wire.x][wire.y] = wire.steps;
}

const step = (wire, direction, distance) => {
    for(let i = 0; i < distance; i++){
        wire.steps++;
        switch(direction){
            case "U": wire.y++; break;
            case "D": wire.y--; break;
            case "L": wire.x--; break;
            case "R": wire.x++; break;
        }
       
        touch(wire);
    }
}

let touched = [];
let intersections = [];

const traverse = (wire, path) => {
    for(let i = 0; i < path.length; i++){
        const part = path[i];
        const direction = part.substring(0,1);
        const distance = Number(part.substring(1));
        
        
        step(wire, direction, distance);
    }
}

traverse(w1, input[0]);
traverse(w2, input[1]);

const closestIntersection = intersections
    .map(intersect => Math.abs(intersect.x) + Math.abs(intersect.y))
    .reduce((a, b) => a < b ? a : b);

console.log("2019/day/3/#part1:", closestIntersection);


const closestDirection = intersections
    .map(intersect => intersect.count)
    .reduce((a, b) => a < b ? a : b);

console.log("2019/day/3/#part2:", closestDirection);