import Game from '@/utils/Game';

class AdvanceeAi {
    constructor(gameInstance){
        this.gameInstance = gameInstance;
        this.directionPrioritiesOrder = [
            Game.directions.right,
            Game.directions.up,
            Game.directions.left,
            Game.directions.down,
        ]
    }

    setGameInstance(gameInstance){
        this.gameInstance = gameInstance;
    }

    setUpdateCallback(updateCallback){
        this.updateCallback = updateCallback;
    }


    testRight(){
        let grid = JSON.stringify(this.gameInstance.getGrid());
        let cpt = 0;        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if(grid[i][j] != 0)
                {
                    let temp = 0;
                }               
            }            
        }
        return cpt;
    }
    next(isEnabled){
        // if game not ended and ai enabled
        if(!this.gameInstance.isGameEnd() && isEnabled)
        {
            let initGridState = JSON.stringify(this.gameInstance.getGrid());
            let upweight = 2;
            let rightWeight = 1;
            let leftWeight = 0;
            let downWeight = -1;
            // for(let direction of this.directionPrioritiesOrder){                
            //     this.gameInstance[direction]();

            //     // if grid has changes
            //     if(JSON.stringify(this.gameInstance.getGrid()) !== initGridState){
            //         this.updateCallback();
            //         break;
            //     }
            // }

        }
    }


}

export default AdvanceAi;