let gridSize = 4;
const ui = new UI;
let gameArray = [];
let tile = 0;
for (let i = 0; i< grid+1; i++) {
    gameArray[i] = new Array();
    for (let j=0; j<grid+2; j++){
        if (i===0 || j === grid+1 || (j===0 && i !== 1)) {
            gameArray[i].push('na');
        } else {
            gameArray[i].push(tile);
            tile++
        }
    }     
}

console.log(gameArray);

let gameCellSize = Math.floor(360 / gridSize);

ui.generateGrid(gridSize, gameCellSize);

ui.gameDiv.addEventListener('click', function(e){
    //check which tile is clicked
    if (e.target.id) {
        tileToMove = e.target.id;
        //check in game array if there is an empty slot around it and assign dir accordingly
        let dir = 'left';
        if (dir) {
            ui.moveTile(tileToMove, dir);
        } else {
            //show alert that tile cannot be moved
        }
    }
});

