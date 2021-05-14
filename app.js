
let gridSize = 4;
const ui = new UI;
// let gameDiv = document.getElementById("game-div");
let gameCellSize = Math.floor(360 / gridSize);

ui.generateGrid(gridSize, gameCellSize);

ui.gameDiv.addEventListener('click', function(e){
    //check which tile is clicked
    console.log(e);
});



for (let tileSelector = 1; tileSelector<=16; tileSelector++){
    document.getElementById(tileSelector).addEventListener('click', function(e){
        console.log(`${tileSelector} tile clicked`);
    });
}

let tiles = document.getElementsByClassName('slide-area').addEventListener('click', function(e){
    console.log('tile clicked');
});

function tileToMove(row, col) {
    let c = gameDiv.children[row].children[col].children[0];
    let dir = 'left';
    switch(dir) {
        case 'horizontal':
            c.style.transform = `translateX(${-gameCellSize}px)`;
            break;
        case 'vertical':
            c.style.transform = `translateX(${gameCellSize}px)`;
            break;
        default:
            console.log('this tile can\'t move'); 

    }
    c.style.transform = `translateX(${-gameCellSize}px)`;
}
>>>>>>> tile-move
