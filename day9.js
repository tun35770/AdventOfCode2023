const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day9.txt'),
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
        let nums = input[i].split(' ').map((n) => Number(n));
        let arr = [nums[nums.length-1]];

        let flag = true;
        while(flag){
            let diff = nums[1] - nums[0];
            let diffs = [diff];
            //console.log(nums)
            for(let j = 2; j < nums.length; j++){
                diffs.push(nums[j] - nums[j-1]);
                if(nums[j] - nums[j-1] !== diff) flag = false;
            }

            arr.push(diffs[diffs.length-1]);
            nums = diffs;
            flag = !flag;
        }
        
        let val = arr[arr.length-1];
        for(let j = arr.length-2; j >= 0; j--){
            val = val + arr[j];
        }

        sum += val;
    }

    console.log(sum);


    //part 2
     sum = 0;
    for(let i = 0; i < input.length; i++){
        let nums = input[i].split(' ').map((n) => Number(n));
        let arr = [nums[0]];

        let flag = true;
        while(flag){
            let diff = nums[1] - nums[0];
            let diffs = [diff];
            //console.log(nums)
            for(let j = 2; j < nums.length; j++){
                diffs.push(nums[j] - nums[j-1]);
                if(nums[j] - nums[j-1] !== diff) flag = false;
            }

            arr.push(diffs[0]);
            nums = diffs;
            flag = !flag;
        }
        
        let val = arr[arr.length-1];
        for(let j = arr.length-2; j >= 0; j--){
            val = arr[j] - val;
        }

        sum += val;
    }

    console.log(sum);
}

main();