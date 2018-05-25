<template>
    <div class="game-grid">
        <div class="game-over-overlay" v-bind:class="gameOverClassObject">
            <div>
                Game over
            </div>
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
            background-color: rgba($color: #000000, $alpha: .5);
            color: #f4f4f4;
            font-weight: bold;
            font-size: 42px;
            opacity: 1;
            border-radius: 3px;
            text-align: center;
            justify-content:center;
            align-content:center;
            flex-direction:column;

            &.game-ended {
                display: flex;
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
                isGameEnd : false            
            }
        },
        created: function () {
            let gameInstance = new Game(4);
                
            this.grid = gameInstance.getGrid();

            console.log(gameInstance.getGrid());
            

            let onKeyPressed = (direction) => {
                if(gameInstance && !this.isGameEnd){
                    gameInstance[direction]();
                    this.grid = gameInstance.getGrid();
                    this.onScoring(gameInstance.getScore());
                    this.isGameEnd = gameInstance.isGameEnd();
                    this.$forceUpdate()
                }
            }

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