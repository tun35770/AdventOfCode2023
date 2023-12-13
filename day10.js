const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day10.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput();

    let g = [];
    let s = [];
    for(let i = 0; i < input.length; i++){
        const line = input[i].split('');
        for(let j = 0; j < line.length; j++){
            if(line[j] === 'S')
                s = [i, j];
        }

        g.push(line);
    }

    function getValidDirs(i, j){
        const dirs = [];

        const isUp = (c) => {
            return (c=== '|' || c === '7' || c === 'F')
        };
        const isDown = (c) => {
            return (c=== '|' || c === 'L' || c === 'J')
        };
        const isLeft = (c) => {
            return (c=== '-' || c === 'L' || c === 'F')
        };
        const isRight = (c) => {
            return (c=== '-' || c === '7' || c === 'J')
        };

        switch(g[i][j]){
            case 'S':   if(i > 0 && isUp(g[i-1][j]) ) dirs.push([i-1, j]);
                        if(i < g.length && isDown(g[i+1][j])) dirs.push([i+1, j]);
                        if(j > 0 && isLeft(g[i][j-1])) dirs.push([i, j-1]);
                        if(j < g[i].length && isRight(g[i][j+1])) dirs.push([i, j+1]);
                        break;
            case '|':   if(i > 0 && isUp(g[i-1][j]) ) dirs.push([i-1, j]);
                        if(i < g.length && isDown(g[i+1][j])) dirs.push([i+1, j]);
                        break;
            case '-':   if(j > 0 && isLeft(g[i][j-1])) dirs.push([i, j-1]);
                        if(j < g[i].length && isRight(g[i][j+1])) dirs.push([i, j+1]);
                        break;
            case 'L':   if(i > 0 && isUp(g[i-1][j]) ) dirs.push([i-1, j]);
                        if(j < g[i].length && isRight(g[i][j+1])) dirs.push([i, j+1]);
                        break;
            case 'J':   if(i > 0 && isUp(g[i-1][j]) ) dirs.push([i-1, j]);
                        if(j > 0 && isLeft(g[i][j-1])) dirs.push([i, j-1]);
                        break;
            case '7':   if(j > 0 && isLeft(g[i][j-1])) dirs.push([i, j-1]);
                        if(i < g.length && isDown(g[i+1][j])) dirs.push([i+1, j]);
                        break;
            case 'F':   if(j < g[i].length && isRight(g[i][j+1])) dirs.push([i, j+1]);
                        if(i < g.length && isDown(g[i+1][j])) dirs.push([i+1, j]);
                        break;
            default:    break;
        }

        return dirs;
    }

    const q = [{coords: s, steps: 0}];
    const v = new Map();
    let max = 0;

    while(q.length > 0){
        const node = q.shift();
        const [i, j] = node.coords;
        const steps = node.steps;

        if(v.has(`${i} ${j}`)) continue;

        v.set(`${i} ${j}`, steps);
        if(steps > max) max = steps;

        const dirs = getValidDirs(i, j);

        for(let i = 0; i < dirs.length; i++){
            q.push({coords: dirs[i], steps: steps+1});
        }
    }

    console.log(max)
}

main();