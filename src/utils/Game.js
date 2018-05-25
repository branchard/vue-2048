import lodash from 'lodash';
import { timingSafeEqual } from 'crypto';

const directions = {
    up: 'onUp',
    down: 'onDown',
    left: 'onLeft',
    right: 'onRight'
};

class Game {
    constructor(size = 4){
        this.size = size;
        this.tilesNumber = size * size;
        this.score = 0;

        /*
         * ------> x
         * |
         * |
         * y
         *
         * [
         *    [0, 0, 0, 0],
         *    [0, 0, 0, 0],
         *    [0, 0, 0, 0],
         *    [0, 0, 0, 0],
         * ]
         */

        // create 2 dimensions array with this.size size filled with 0
        this.grid = [];       
        for (let y = 0; y < this.size; y++) {
            this.grid.push([]);
            for (let x = 0; x < this.size; x++) {
                this.grid[y].push(0);
            }
        }

        this.spawnRandomTiles(lodash.round(this.size / 2));
    }

    spawnRandomTiles(n){
        for(let i of lodash.range(0, n)){
            if(this.isGridFull()){
                return;
            }
            while(true){
                let y = lodash.random(0, this.size - 1);
                let x = lodash.random(0, this.size - 1);
                if(this.grid[y][x] === 0){
                    // 10% chance to get a 4
                    this.grid[y][x] = Math.random() < 0.1 ? 4 : 2;
                    break;
                }
            }
        }
    }

    isGridFull(){
        for(let line of this.grid){
            for(let tile of line){
                if(tile === 0){
                    return false;
                }
            }
        }

        return true;
    }

    isGameEnd(){
        // if can't move
        if(!this.isGridFull()){
            return false;
        }

        // check if tiles have meltable neighbours

        for(let x = 0; x < this.size; x++){
            for(let y = 0; y < this.size; y++){
                // check left neighbour
                if(x !== 0 && this.grid[y][x] === this.grid[y][x - 1]){
                    return false;
                }

                // check right neighbour
                if(x < this.size - 1 && this.grid[y][x] === this.grid[y][x + 1]){
                    return false;
                }

                // check top neighbour
                if(y !== 0 && this.grid[y][x] === this.grid[y - 1][x]){
                    return false;
                }

                // check bottom neighbour
                if(y < this.size - 1 && this.grid[y][x] === this.grid[y + 1][x]){
                    return false;
                }
            }
        }

        return true;
    }

    getGrid(){
        return this.grid;
    }

    setGrid(grid){
        this.grid = grid;
    }

    getScore(){
        return this.score;
    }

    setScore(score){
        this.score = score;
    }

    onUp(){
        let tilesMoved = false;
        for(let x = 0; x < this.size; x++){
            let tilesMerged = false;
            for(let y = 1; y < this.size; y++){
                if(this.grid[y][x] === 0){
                    continue;
                }
                for(let yShift = y - 1; yShift >=0; yShift--){
                    if(this.grid[yShift][x] === 0 || (this.grid[yShift][x] === this.grid[yShift + 1][x] && !tilesMerged)){
                        let sum = this.grid[yShift][x] + this.grid[yShift + 1][x];
                        if(this.grid[yShift][x] !== 0){
                            tilesMerged = true;
                            this.score += sum;
                        }
                        this.grid[yShift][x] = sum;
                        this.grid[yShift + 1][x] = 0;
                        tilesMoved = true;
                    }
                }
            }
        }

        if(tilesMoved){
            this.spawnRandomTiles(1);
        }
    }

    onDown(){
        let tilesMoved = false;
        for(let x = 0; x < this.size; x++){
            let tilesMerged = false;
            for(let y = this.size - 2; y >= 0; y--){
                if(this.grid[y][x] === 0){
                    continue;
                }
                for(let yShift = y + 1; yShift < this.size; yShift++){
                    if(this.grid[yShift][x] === 0 || (this.grid[yShift][x] === this.grid[yShift - 1][x] && !tilesMerged)){
                        let sum = this.grid[yShift][x] + this.grid[yShift - 1][x];
                        if(this.grid[yShift][x] !== 0){
                            tilesMerged = true;
                            this.score += sum;
                        }
                        this.grid[yShift][x] = sum;
                        this.grid[yShift - 1][x] = 0;
                        tilesMoved = true;
                    }
                }
            }
        }

        if(tilesMoved){
            this.spawnRandomTiles(1);
        }
    }

    onLeft(){
        let tilesMoved = false;
        for(let y = 0; y < this.size; y++) {
            let tilesMerged = false;
            for(let x = 1; x < this.size; x++){
                if(this.grid[y][x] === 0){
                    continue;
                }
                for(let xShift = x - 1; xShift >=0; xShift--){
                    if(this.grid[y][xShift] === 0 || (this.grid[y][xShift] === this.grid[y][xShift + 1] && !tilesMerged)){
                        let sum = this.grid[y][xShift] + this.grid[y][xShift + 1];
                        if(this.grid[y][xShift] !== 0){
                            tilesMerged = true;
                            this.score += sum;
                        }
                        this.grid[y][xShift] = sum;
                        this.grid[y][xShift + 1] = 0;
                        tilesMoved = true;
                    }
                }
            }
        }

        if(tilesMoved){
            this.spawnRandomTiles(1);
        }
    }

    onRight(){
        let tilesMoved = false;
        for(let y = 0; y < this.size; y++) {
            let tilesMerged = false;
            for(let x = this.size - 2; x >= 0; x--){
                if(this.grid[y][x] === 0){
                    continue;
                }
                for(let xShift = x + 1; xShift < this.size; xShift++){
                    if(this.grid[y][xShift] === 0 || (this.grid[y][xShift] === this.grid[y][xShift - 1] && !tilesMerged)){
                        let sum = this.grid[y][xShift] + this.grid[y][xShift - 1];
                        if(this.grid[y][xShift] !== 0){
                            tilesMerged = true;
                            this.score += sum;
                        }
                        this.grid[y][xShift] = sum;
                        this.grid[y][xShift - 1] = 0;
                        tilesMoved = true;
                    }
                }
            }
        }

        if(tilesMoved){
            this.spawnRandomTiles(1);
        }
    }
}

Game.directions = directions;

export default Game;