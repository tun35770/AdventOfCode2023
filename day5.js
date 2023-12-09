const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day5.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput();

    let seeds = input[0].split(' ');
    seeds.shift();
    seeds = seeds.map((s) => Number(s));
    seeds = seeds.sort((a, b) => a - b);

    let maps = [];

    for(let i = 0; i < 7; i++){
        maps.push([])
    }

    for(let i = 2; i <= 49; i++){
        let arr = input[i].split(' ').map((s) => Number(s));
        for(let j = 0; j < arr.length; j++){
            maps[0].push(arr[j]);
        }
    }

    for(let i = 51; i <= 73; i++){
        let arr = input[i].split(' ').map((s) => Number(s));
        for(let j = 0; j < arr.length; j++){
            maps[1].push(arr[j]);
        }
    }

    for(let i = 75; i <= 109; i++){
        let arr = input[i].split(' ').map((s) => Number(s));
        for(let j = 0; j < arr.length; j++){
            maps[2].push(arr[j]);
        }
    }

    for(let i = 111; i <= 133; i++){
        let arr = input[i].split(' ').map((s) => Number(s));
        for(let j = 0; j < arr.length; j++){
            maps[3].push(arr[j]);
        }
    }

    for(let i = 135; i <= 149; i++){
        let arr = input[i].split(' ').map((s) => Number(s));
        for(let j = 0; j < arr.length; j++){
            maps[4].push(arr[j]);
        }
    }

    for(let i = 151; i <= 161; i++){
        let arr = input[i].split(' ').map((s) => Number(s));
        for(let j = 0; j < arr.length; j++){
            maps[5].push(arr[j]);
        }
    }

    for(let i = 163; i <= 189; i++){
        let arr = input[i].split(' ').map((s) => Number(s));
        for(let j = 0; j < arr.length; j++){
            maps[6].push(arr[j]);
        }
    }

    //console.log(maps[0])
    let min = Infinity;

    for(let i = 0; i < seeds.length; i++){
        let val = seeds[i];

        for(let j = 0; j < maps.length; j++){
            const map = maps[j];

            for(let k = 0; k < map.length; k+=3){
                const dest = map[k], source = map[k+1], range = map[k+2];

                if(val >= source && val < source+range){
                    val = (val - source) + dest;
                    break;
                }
            }
        }

        min = Math.min(min, val);
    }

    console.log(min);
}

main();