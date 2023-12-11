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


    //part 1
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


    //part 2
    const keys = Object.keys(g);
    let q = [];

    for(let i = 0; i < keys.length; i++){
        if(keys[i].charAt(2) === 'A')
            q.push(keys[i]);
    }

    turns = input[0];
    let arr = [];

    for(let j = 0; j < q.length; j++){

        let here = q[j];
        let i = 0;
        let steps = 0;

        while(here.charAt(2) !== 'Z'){
            let dir = turns.charAt(i);

            if(dir === 'L')
                here = g[here][0];
            else
                here = g[here][1];

            i = (i+1) % turns.length;

            steps++;

        }

        arr.push(steps);
    }

    arr = arr.sort((a, b) => a - b);


    //find LCM of each starting node's steps

    //had to copy paste this part :)
    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }

    let multiple = arr[0];
    arr.forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    console.log(multiple);
}

main();