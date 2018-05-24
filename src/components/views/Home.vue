<template>
    <div>
        <Board/>
    </div>
</template>

<script>
    import Board from '@/components/board/Board';
    import board from "../../Board.js"
    console.log(board);

    board.init(4);
    board.log();

    document.onkeydown = move;

    function move(_event_)
    {
        var winObj = checkEventObj(_event_)
        var intKeyCode = winObj.keyCode; 
        //console.log(intKeyCode);
        var direction = '';

        if (intKeyCode == 37)
        {
            direction = 'left';
        }
        else if (intKeyCode == 38)
        {
            direction = 'up';
        }
        else if (intKeyCode == 39)
        {
            direction = 'right';
        }
        else if (intKeyCode == 40)
        {
            direction = 'down';
        }

        //console.log(direction);
        //board.move(direction);
        //board.log();
    }
    function checkEventObj ( _event_ )
    {
         // --- IE explorer 
         if ( window.event ) return window.event; 
         // --- Netscape and other explorers 
         else return _event_; 
    }
    export default {
        name: 'Home',
        components: { Board }
    };
</script>