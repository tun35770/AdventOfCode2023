const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day4.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput();


    //part 1
    let total_points = 0;

    for(let i = 0; i < input.length; i++){
        const line = input[i].split(':');
        //console.log(line)
        const arr = line[1].split('|');
        const winning_arr = arr[0].split(' ');
        const nums = arr[1].split(' ');
        const winners = new Set();
    
        let count = 0;
        //console.log(winning_arr)
        for(let j = 1; j < winning_arr.length-1; j++){
            winners.add(winning_arr[j]);
        }

        for(let j = 0; j < nums.length; j++){
            //console.log(nums[j])
            if(winners.has(nums[j])) count++;
        }

        if(count > 0)
            total_points += 2 ** (count - 1);
    }

    console.log(total_points);
}

main();