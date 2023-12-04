const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day3.txt'),
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
    let g = [];

    const isSymbol = (row, col) => {
        return g[row][col] !== '.' && (g[row][col] < "0" || g[row][col] > '9');
    }

    const checkPartNum = (row, col, w) => {
        let flag = false;
       
        for(let i = row - 1; i <= row + 1; i++){
            for(let j = col - 1; j <= col + w; j++){
                if(i >= 0 && i < g.length && col >= 0 && col < g[i].length && isSymbol(i, j)){
                    flag = true;
                    break;
                }
            }

            if(flag) return flag;
        }
        return flag;
    }

    for(let i = 0; i < input.length; i++){
        const line = input[i];
        g.push(line.split(''));
    }

    let sum = 0;

    for(let i = 0; i < g.length; i++){
        for(let j = 0; j < g[i].length;){
            
            if(g[i][j] >= "0" && g[i][j] <= "9"){
                let w = 1;

                if(j < g[i].length-1 && (g[i][j+1] >= "0" && g[i][j+1] <= "9")){
                    w = 2;
                    if(j < g[i].length-2 && (g[i][j+2] >= "0" && g[i][j+2] <= "9")){
                        w = 3;
                    }
                }

                if(checkPartNum(i, j, w)){
                    let num = "";
                    for(let k = 0; k < w; k++){
                        num += g[i][j+k];
                    }
    
                    //console.log(num)
                    sum += Number(num);
                }

                j += w;
                continue;
            }

            j++;
        }
    }

    console.log(sum);


    //part 2
    sum = 0;
    let map = new Map();

    const isStar = (row, col) => {
        return g[row][col] === '*';
    }

    const checkAdjToStar = (row, col, w) => {
        let idx = [-1, -1];
       
        for(let i = row - 1; i <= row + 1; i++){
            for(let j = col - 1; j <= col + w; j++){
                if(i >= 0 && i < g.length && col >= 0 && col < g[i].length && isStar(i, j)){
                    idx = [i, j];
                    break;
                }
            }

            if(idx[0] !== -1) return idx;
        }
        return idx;
    }

    for(let i = 0; i < g.length; i++){
        for(let j = 0; j < g[i].length;){
            
            if(g[i][j] >= "0" && g[i][j] <= "9"){
                let w = 1;

                if(j < g[i].length-1 && (g[i][j+1] >= "0" && g[i][j+1] <= "9")){
                    w = 2;
                    if(j < g[i].length-2 && (g[i][j+2] >= "0" && g[i][j+2] <= "9")){
                        w = 3;
                    }
                }

                const starIdx = checkAdjToStar(i, j, w);
                if(starIdx[0] !== -1){
                    let num = "";
                    for(let k = 0; k < w; k++){
                        num += g[i][j+k];
                    }
    
                    //console.log(num)
                    if(map.has(`${starIdx[0]} ${starIdx[1]}`)){
                        sum += map.get(`${starIdx[0]} ${starIdx[1]}`) * Number(num);
                        
                    }
                        
                    else
                        map.set(`${starIdx[0]} ${starIdx[1]}`, [Number(num)]);
                }

                j += w;
                continue;
            }

            j++;
        }
    }

    console.log(sum);

}

main();