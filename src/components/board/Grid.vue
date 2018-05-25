<template>
    <div class="game-grid">
        <div class="game-over-overlay" v-bind:class="gameOverClassObject">
            <div>
                Game over
            </div>
            <md-button class="md-raised md-accent" v-on:click="restartWithAi">Restart with AI</md-button>
            <md-button class="md-raised md-primary" v-on:click="restartWithoutAi">Restart without AI</md-button>
        </div>
        <div class="game-grid-inner">
            <div v-for="(line, index) in grid" :key="index">
                <div v-for="(tile, index) in line" :key="index">
                    <Tile :value="tile"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $gutter: 12px;
    .game-grid {
        position: relative;
        height: 100%;
        width: 100%;

        .game-over-overlay {
            display: none;
            position: absolute;
            z-index: 100;
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000000, $alpha: .6);
            color: #f4f4f4;
            font-weight: bold;
            font-size: 42px;
            opacity: 1;
            border-radius: 3px;
            text-align: center;
            justify-content:center;
            align-content:center;
            flex-direction:column;

            box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.01), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

            &.game-ended {
                display: flex;
            }

            .md-raised {
                width: 256px;
                margin: 16px auto 0 auto;
                &:nth-child(2){
                    margin: 50px auto 0 auto;
                }
            }
        }        

        .game-grid-inner{
            position: relative;
            height: 100%;
            width: 100%;
            
            & > div {
                position: relative;
                height: 25%;
                width: 100%;
                padding-top: $gutter / 2;
                padding-bottom: $gutter / 2;

                &:first-child {
                    padding-top: 0;
                }

                &:last-child {
                    padding-bottom: 0;
                }

                & > div {
                    display: inline-block;
                    position: relative;
                    height: 100%;
                    width: 25%;

                    .game-tile {
                        margin-left: $gutter / 2;
                        margin-right: $gutter / 2;
                    }
                    
                    &:first-child {
                        .game-tile {
                            margin-left: 0;
                        }
                    }

                    &:last-child {
                        .game-tile {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
</style>

<script>
    //import { mapGetters, mapActions } from 'vuex';
    import Tile from '@/components/board/Tile';
    import Game from '@/utils/Game';
    import NaiveAi from '@/utils/NaiveAi';

    const gameLocalStorageName = 'gameState';
    const iaTimeout = 250; // in ms

    export default {
        name: 'Grid',
        components: { Tile },
        props: {
            onScoring: {
                type: Function,
                required: true
            }
        },
        data: function () {
            return {
                // 2 dimentions array that represent game state
                grid: [],
                isGameEnd: false,
                isAiEnabled: true
            }
        },
        methods: {
            restartWithAi: function(){
                this.isAiEnabled = true;
                this.restart();
            },
            restartWithoutAi: function(){
                this.isAiEnabled = false;
                this.restart();
            },
            restart: function(){
                this.gameInstance = new Game(4);
                this.refresh();
                this.ai.setGameInstance(this.gameInstance);
                this.ai.next(this.isAiEnabled);
            },
            refresh: function(){
                this.grid = this.gameInstance.getGrid();
                localStorage.setItem(gameLocalStorageName, JSON.stringify({
                    grid: this.grid,
                    score: this.gameInstance.getScore()
                }));
                this.onScoring(this.gameInstance.getScore());
                this.isGameEnd = this.gameInstance.isGameEnd();
                this.$forceUpdate()
            }
        },
        created: function () {
            this.gameInstance = new Game(4);

            let storedGameState = JSON.parse(localStorage.getItem(gameLocalStorageName));
            if(storedGameState){
                this.gameInstance.setGrid(storedGameState.grid);
                this.gameInstance.setScore(storedGameState.score);
            }

            this.refresh();

            this.ai = new NaiveAi(this.gameInstance);
            let iaCallback = () => {
                this.refresh();
                setTimeout(() => {
                    this.ai.next(this.isAiEnabled);
                }, iaTimeout);
            };
            this.ai.setUpdateCallback(iaCallback);
            this.ai.next(this.isAiEnabled);

            let onKeyPressed = (direction) => {
                if(this.gameInstance && !this.isGameEnd){
                    this.gameInstance[direction]();
                    this.refresh();
                }
            }

            // add keyboard listerners
            document.addEventListener('keydown', function(e) {
                switch (e.key) {
                    case 'ArrowUp':
                    case 'z':
                    case 'Z':
                        onKeyPressed(Game.directions.up);
                        break;
                    case 'ArrowDown':
                    case 's':
                    case 'S':
                        onKeyPressed(Game.directions.down);
                        break;
                    case 'ArrowLeft':
                    case 'q':
                    case 'Q':
                        onKeyPressed(Game.directions.left);
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        onKeyPressed(Game.directions.right);
                        break;
                }
            }, false);
        },
        computed: {
            gameOverClassObject: function () {
                return {
                    'game-ended': this.isGameEnd
                }
            }
        }
    };
</script>