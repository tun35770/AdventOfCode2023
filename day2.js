const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day2.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput();

    const map = {
        'red': 12,
        'green': 13,
        'blue': 14
    }

    //part 1
    let count = 0;

    for(let i = 0; i < input.length; i++){
        const line = input[i].split(' ');
          
        let flag = true;

        for(let j = 2; j < line.length; j+=2){
            const num = line[j];
            let color = line[j+1];
            if(color.charAt(color.length-1) === ',' || color.charAt(color.length-1) === ';')
                color = color.substring(0, color.length-1);
            if(map[color] < Number(num)){
                flag = false;
                break;
            }

        }

        if(flag) count += i + 1;
    }

    console.log(count);


    //part 2
    let total_power = 0;

    for(let i = 0; i < input.length; i++){
        const line = input[i].split(' ');
          
        let maxRed = 0, maxGreen = 0, maxBlue = 0;

        for(let j = 2; j < line.length; j+=2){
            const num = Number(line[j]);
            let color = line[j+1];
            if(color.charAt(color.length-1) === ',' || color.charAt(color.length-1) === ';')
                color = color.substring(0, color.length-1);
            
            switch(color){
                case 'red': maxRed = Math.max(maxRed, num);
                    break;
                case 'green': maxGreen = Math.max(maxGreen, num);
                    break;
                case 'blue': maxBlue = Math.max(maxBlue, num);
                    break;
            }

        }

        total_power += maxRed * maxGreen * maxBlue
    }

    console.log(total_power);
}

main();