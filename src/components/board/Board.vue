<template>
    <div class="game-board">
        <div class="grid-container">
            <Grid/>
        </div>
        <div class="score-container md-layout">
            <md-card class="md-primary md-layout-item">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">Score</div>
                        <div class="md-subhead">2600</div>
                    </md-card-header-text>
                </md-card-header>
            </md-card>
            <md-card class="md-primary md-layout-item">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">High score</div>
                        <div class="md-subhead">7800</div>
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
            }
        }
    }
</style>

<script>
import Grid from '@/components/board/Grid';

export default {
    name: 'Board',
    components: { Grid }
};
</script>