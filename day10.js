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
            return (c=== '|' || c === '7' || c === 'F' || c === 'S')
        };
        const isDown = (c) => {
            return (c=== '|' || c === 'L' || c === 'J' || c === 'S')
        };
        const isLeft = (c) => {
            return (c=== '-' || c === 'L' || c === 'F' || c === 'S')
        };
        const isRight = (c) => {
            return (c=== '-' || c === '7' || c === 'J' || c === 'S')
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


    //part 1
    const q = [{coords: s, steps: 0}];
    let v = new Map();
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


    //part 2

    let loop = {};

    const stack = [ [s[0], s[1], [-1,-1], 0] ];

    while(stack.length > 0){
        const [i, j, prev, steps] = stack.pop();
        if(i == s[0] && j == s[1] && steps > 10) {
            loop[`${prev[0]} ${prev[1]}`] = [i, j];
            break;
        }
        
        loop[`${prev[0]} ${prev[1]}`] = [i, j];
        const dirs = getValidDirs(i, j);

        for(let k = 0; k < dirs.length; k++){
            if(dirs[k][0] !== prev[0] || dirs[k][1] !== prev[1])
                stack.push([dirs[k][0], dirs[k][1], [i, j], steps+1])
        }

    }

    const newloop = {};
    let node = s;
    while(true){
        newloop[`${node[0]} ${node[1]}`] = loop[`${node[0]} ${node[1]}`];
        const next = loop[`${node[0]} ${node[1]}`];
        if(next[0] == s[0] && next[1] == s[1]) break;
        node = next;
    }

    loop = newloop;
 
    v = new Map();
    node = s;
    node[0] = Number(node[0]);
    node[1] = Number(node[1]);
    let count = 0;


    //really not proud of this
    while(true){
        const next = loop[`${node[0]} ${node[1]}`];

        const dirToCheck = next[0] - node[0] == 1 ? 'l':
                           next[0] - node[0] == -1 ? 'r' :
                           next[1] - node[1] == 1 ? 'd' : 'u';
        
        let iter = (next[0] - node[0] == 1 ? [node[0], node[1]-1]:
                   next[0] - node[0] == -1 ? [node[0], node[1]+1] :
                   next[1] - node[1] == 1 ? [node[0]+1, node[1]] : [node[0]-1, node[1]]);

        while(iter[0] >= 0 && iter[1] >= 0 && iter[0] < g.length && iter[1] < g[iter[0]].length){
            if(`${iter[0]} ${iter[1]}` in loop)
                break;

            if(!v.has(`${iter[0]} ${iter[1]}`))
                count++;
            v.set(`${iter[0]} ${iter[1]}`, 1);

            switch(dirToCheck){
                case 'u': iter[0]--;
                break;
                case 'd': iter[0]++;
                break;
                case 'l': iter[1]--;
                break;
                case 'r': iter[1]++;
                break;
            }
        }


        iter = (next[0] - node[0] == 1 ? [next[0], next[1]-1]:
            next[0] - node[0] == -1 ? [next[0], next[1]+1] :
            next[1] - node[1] == 1 ? [next[0]+1, next[1]] : [next[0]-1, next[1]]);

        while(iter[0] >= 0 && iter[1] >= 0 && iter[0] < g.length && iter[1] < g[iter[0]].length){
            if(`${iter[0]} ${iter[1]}` in loop)
                break;

            if(!v.has(`${iter[0]} ${iter[1]}`))
                count++;
            v.set(`${iter[0]} ${iter[1]}`, 1);

            switch(dirToCheck){
                case 'u': iter[0]--;
                break;
                case 'd': iter[0]++;
                break;
                case 'l': iter[1]--;
                break;
                case 'r': iter[1]++;
                break;
            }
        }

        if(next[0] == s[0] && next[1] == s[1]) break;

        node = next;
    }

    console.log(count);
}

main();