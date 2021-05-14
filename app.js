
let gridSize = 4;
const ui = new UI;
// let gameDiv = document.getElementById("game-div");
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

