import Game from '@/utils/Game';

class NaiveAi {
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

    next(isEnabled){
        // if game not ended and ai enabled
        if(!this.gameInstance.isGameEnd() && isEnabled){
            let initGridState = JSON.stringify(this.gameInstance.getGrid());
            for(let direction of this.directionPrioritiesOrder){                
                this.gameInstance[direction]();

                // if grid has changes
                if(JSON.stringify(this.gameInstance.getGrid()) !== initGridState){
                    this.updateCallback();
                    return;
                }
            }
            console.log('WTF, the game is not ended, but I can\'t move');
        }
    }
}

export default NaiveAi;