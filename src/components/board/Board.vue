<template>
    <div class="game-board">
        <div class="grid-container">
            <Grid :onScoring=onScoring />
        </div>
        <div class="score-container md-layout">
            <md-card class="md-primary md-layout-item">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">Score</div>
                        <div class="md-subhead">{{ score }}</div>
                    </md-card-header-text>
                </md-card-header>
            </md-card>
            <md-card class="md-primary md-layout-item">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">High score</div>
                        <div class="md-subhead">{{ highScore }}</div>
                    </md-card-header-text>
                </md-card-header>
            </md-card>            
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $gutter: 12px; 
    .game-board {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: calc(100vh - (64px + 12px * 2));
        height: calc(100vh - (64px + 12px * 2));

        .grid-container {
            flex: 1;
            padding-bottom: $gutter;
        }

        .score-container {
            text-align: center;

            .md-card {
                margin-right: $gutter / 2;
                margin-left: $gutter / 2;
            }

            .md-card:first-child {
                margin-left: 0;
            }

            .md-card:last-child {
                margin-right: 0;
            }

            .md-subhead {
                opacity: 0.8;
                font-size: 16px;
                line-height: 24px;
            }
        }
    }
</style>

<script>
import Grid from '@/components/board/Grid';

const highScoreLocalStorageName = 'highScore';

export default {
    name: 'Board',
    data: function () {
        return {
            score: 0,
            highScore: localStorage.getItem(highScoreLocalStorageName) || 0
        }
    },
    methods: {
        onScoring: function(score){
            this.score = score;
            if(score > this.highScore){
                this.highScore = score;
                localStorage.setItem(highScoreLocalStorageName, score);
            }
        },
    },
    components: { Grid }
};
</script>