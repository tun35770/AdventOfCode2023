const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day1.txt'),
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
    let sum = 0;

    for(let i = 0; i < input.length; i++){
        const line = input[i];
        let num = "";

        for(let j = 0; j < line.length; j++){
            if(!isNaN(Number(line.charAt(j)))){
                num += Number(line.charAt(j));
                break;
            }
        }

        for(let j = line.length-1; j >= 0; j--){
            if(!isNaN(Number(line.charAt(j)))){
                num += Number(line.charAt(j));
                break;
            }
        }

        sum += Number(num);
    }

    console.log(sum);
    //part 2
    
    sum = 0;
    for(let i = 0; i < input.length; i++){
        const line = input[i];
        let num = 0;
        let str = "";
        const map = {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8,
            'nine': 9
        };

        for(let j = 0; j < line.length; j++){
            if(!isNaN(Number(line.charAt(j)))){
                num = Number(line.charAt(j))*10;
                break;
            }
            else{
                str += line.charAt(j);

                if(str.length >= 3){
                    if(str.length > 5)
                        str = str.substring(1);

                    if(map[str] !== undefined){
                        num = map[str] * 10;
                        break;
                    }

                    if(map[str.substring(1)] !== undefined){
                        num = map[str.substring(1)] * 10;
                        break;
                    }

                    if(map[str.substring(2)] !== undefined){
                        num = map[str.substring(2)] * 10;
                        break;
                    }

                }
            }
        }

        str = "";

        for(let j = line.length-1; j >= 0; j--){
            if(!isNaN(Number(line.charAt(j)))){
                num += Number(line.charAt(j));
                break;
            }
            else{
                str = line.charAt(j) + str;

                if(str.length >= 3){
                    if(str.length > 5)
                        str = str.substring(0, str.length-1);

                    if(map[str] !== undefined){
                        num += map[str];
                        break;
                    }

                    if(map[str.substring(0, str.length-1)] !== undefined){
                        num += map[str.substring(0, str.length-1)];
                        break;
                    }

                    if(map[str.substring(0, str.length-2)] !== undefined){
                        num += map[str.substring(0, str.length-2)];
                        break;
                    }

                }
            }
        }

        sum += Number(num);
    }

    console.log(sum);
}

main();