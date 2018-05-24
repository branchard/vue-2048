<template>
    <div class="game-grid">
        <div v-for="(line, index) in tiles" :key="index">
            <div v-for="(item, index) in line" :key="index">
                <Tile :value="item"/>
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
</style>

<script>
    import Tile from '@/components/board/Tile'

    export default {
        name: 'Grid',
        components: { Tile },
        data: function () {
            return {
                tiles: [
                    [2, 0, 2, 0],
                    [0, 0, 0, 0],
                    [4, 0, 0, 0],
                    [4096, 0, 0, 0]
                ]
            }
        }
    };
</script>