const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day7.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {
    await readInput();

    function encode(s){
        const table = {
            '1': '01','2': '02','3': '03','4': '04','5': '05','6': '06',
            '7': '07','8': '08','9': '09','T': '10','J': '11','Q': '12','K': '13',
            'A': '14'
        };

        let str = "";
        let max_count = 0;
        let map = new Map();

        for(let i = 0; i < s.length; i++){
            const c = s.charAt(i);
            str += table[c];

            if(!map.has(c)){
                map.set(c, 1)
            }
            else{
                map.set(c, map.get(c) + 1);
                max_count = Math.max(max_count, map.get(c));
            }
        }

        //one pair
        if(map.size === 4)
            str += '0';
        //two pair
        else if(map.size === 3 && max_count === 2)
            str += '00';
        //three of a kind
        else if(map.size === 3 && max_count === 3)
            str += '000';
        //full house
        else if(map.size === 2 && max_count === 3)
            str += '0000';
        //four of a kind
        else if(map.size === 2 && max_count === 4)
            str += '00000';
        //five of a kind
        else if(map.size === 1)
            str += '000000';

        return Number(str);

    }


    //part 1
    let sorted_list  = [];

    for(let i = 0; i < input.length; i++){
        const line = input[i].split(' ');
        const hand_value = encode(line[0]);
        sorted_list.push({val: hand_value, bid: Number(line[1])});
    }

    sorted_list = sorted_list.sort((a, b) => a.val - b.val);

    let sum = 0;
    for(let i = 0; i < sorted_list.length; i++){
        const hand = sorted_list[i];
        sum += (i+1) * hand.bid;
    }

    console.log(sum);
}

main();