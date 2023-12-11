const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day8.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput();

    let g = {};

    for(let i = 1; i < input.length; i++){
        const line = input[i].split(' ');

        g[line[0]] = [line[1], line[2]];
    }

    let turns = input[0];
    let here = 'AAA';
    let i = 0;
    let steps = 0;

    while(here !== 'ZZZ'){
        if(turns.charAt(i) === 'L')
            here = g[here][0];
        else
            here = g[here][1];

            steps++;
            i = (i+1) % turns.length
    }

    console.log(steps);
}

main();