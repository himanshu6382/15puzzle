let gridSize = 4;
const ui = new UI;
// let gameDiv = document.getElementById("game-div");
let gameCellSize = Math.floor(360 / gridSize);

ui.generateGrid(gridSize, gameCellSize);

ui.gameDiv.addEventListener('click', function(e){
    //check which tile is clicked
    console.log(e);
});