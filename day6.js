const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day6.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput();

    let times = [], dist = [];

    times = input[0].split(' ');
    times.shift();
    times = times.map((t) => Number(t));

    dist = input[1].split(' ');
    dist.shift();
    dist = dist.map((d) => Number(d));

    //part 1
    let total = 1;

    for(let i = 0; i < times.length; i++){
        let t = times[i], d = dist[i];
        let count = 0;

        for(let j = 0; j < t; j++){
            if( (t-j) * j > d) count++;
        }

        total *= count;
    }

    console.log(total);


    //part 2

    let time = "", distance = "";

    for(let i = 0; i < times.length; i++){
        time += times[i].toString();
    }

    for(let i = 0; i < dist.length; i++){
        distance += dist[i].toString();
    }

    time = Number(time);
    distance = Number(distance);
    let count = 0;

    for(let j = 0; j < time; j++){
        if( (time-j) * j > distance) count++;
    }

    console.log(count);
}

main();