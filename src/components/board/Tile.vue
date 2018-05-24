<template>
    <div class="game-tile" v-bind:class="classObject">
        <div>
            {{ value ? value : '' }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
    //2 - 4 - 8 - 16 - 32 - 64 - 128 - 256 - 512 - 1024 - 2048
    .game-tile{
        position: absolute;
        background-color: lightgray;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 3px;
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        color: #f4f4F4;

        display: flex;
        justify-content:center;
        align-content:center;
        flex-direction:column;

        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.01), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    
        &.color-1{
            background-color:  #448AFF;
        }

        &.color-2{
            background-color:  #2962FF;
        }

        &.color-3{
            background-color:  #E040FB;
        }

        &.color-4{
            background-color:  #AA00FF;
        }

        &.color-5{
            background-color:  #FF4081;
        }

        &.color-6{
            background-color:  #C51162;
        }

        &.color-7{
            background-color:  #FF5252;
        }

        &.color-8{
            background-color:  #DD2C00;
        }

        &.color-9{
            background-color:  #E65100;
        }

        &.color-10{
            background-color:  #FF6D00;
        }

        &.color-11{
            background-color:  #FFC400;
        }

        &.color-12{
            background-color:  #212121;
        }
    }
</style>

<script>
    export default {
        name: 'Tile',
        props: {
            value: {
                type: Number,
                required: false
            }
        },
        computed: {
            classObject: function () {
                let obj = {};
                if(this.value){
                    let colorNumber = 0;
                    if(this.value > 2048){
                        colorNumber = 12;
                    }else{
                        switch (this.value) {
                            case 2:
                                colorNumber = 1;
                                break;
                            case 4:
                                colorNumber = 2;
                                break;
                            case 8:
                                colorNumber = 3;
                                break;
                            case 16:
                                colorNumber = 4;
                                break;
                            case 32:
                                colorNumber = 5;
                                break;
                            case 64:
                                colorNumber = 6;
                                break;
                            case 128:
                                colorNumber = 7;
                                break;
                            case 256:
                                colorNumber = 8;
                                break;
                            case 512:
                                colorNumber = 9;
                                break;
                            case 1024:
                                colorNumber = 10;
                                break;
                            case 2048:
                                colorNumber = 11;
                                break;
                        }
                    }
                    
                    obj[`color-${colorNumber}`] = true;
                }
            
                return obj;
            }
        }
    };
</script>