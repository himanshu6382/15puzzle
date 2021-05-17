let gameState = 0;
let gridSize = 3;
const ui = new UI;
let gameArray = [];
let tileMovTracker = [];
let tile = 0;
let gameCellSize = 360 / gridSize;
createGameArray();
scramble();
ui.generateGrid(gridSize);

ui.gameDiv.addEventListener('click', function (e) {
    //check which tile is clicked
    if (parseInt(e.target.id)) {
        tileToMove = e.target.id;
        let tileIndex = getTileIndex(tileToMove);//get index of tileToMove in gameArray
        //check in game array if there is an empty slot around it and assign dir accordingly
        let dir = getMoveDir(tileIndex);
        updateGameArray(tileToMove, tileIndex, dir);
        if (dir != 'ignore') {
            ui.moveTile(tileToMove, dir);
        } else {
            //show alert that tile cannot be moved
        }
    }
});

document.getElementById('game-init').addEventListener('click', function (e) {
    let gridSizeOptions = document.getElementById('grid-size-selector').children;
    for (size of gridSizeOptions) {
        let option = size.children[0];
        if (option.checked) gridSize = parseInt(option.value);
    }
    initiateGameVariables();
});

function initiateGameVariables(){
    gameCellSize = 360 / gridSize;
    tile = 0;
    createGameArray();
    scramble();
    ui.clearGrid();
    ui.generateGrid(gridSize);
}

function createGameArray() {
    for (let i = 0; i < gridSize + 2; i++) {
        gameArray[i] = new Array();
        for (let j = 0; j < gridSize + 2; j++) {
            if (i === 0 || i === gridSize + 1 || j === gridSize + 1 || (j === 0 && i !== 1)) {
                gameArray[i].push('na');
            } else {
                gameArray[i].push(tile);
                tile++
            }
        }
    }
}

function getTileIndex(value) {
    let row, col;
    for (row = 1; row < gridSize + 1; row++) {
        col = gameArray[row].indexOf(parseInt(value));
        if (col !== -1) {
            return ([row, col]);
        }
    }
}

function getMoveDir(tileIndex) {

    // console.log(gameArray[tileIndex[0]+1][tileIndex[1]])
    if (tileIndex[0] === 1 && tileIndex[1] === 0 && gameArray[1][1] === 0) {
        return 'right';
    } else if (gameArray[tileIndex[0] - 1][tileIndex[1]] === 0) {
        return 'up'
    } else if ((gameArray[tileIndex[0] + 1][tileIndex[1]] === 0)) {
        return 'down'
    } else if (gameArray[tileIndex[0]][tileIndex[1] - 1] === 0) {
        return 'left'
    } else if (gameArray[tileIndex[0]][tileIndex[1] + 1] === 0) {
        return 'right'
    } else return 'ignore'
}

function updateGameArray(element, index, dir) {
    switch (dir) {
        case 'left':
            gameArray[index[0]][index[1] - 1] = gameArray[index[0]][index[1]];
            gameArray[index[0]][index[1]] = 0;
            break;
        case 'right':
            gameArray[index[0]][index[1] + 1] = gameArray[index[0]][index[1]];
            gameArray[index[0]][index[1]] = 0;
            break;
        case 'up':
            gameArray[index[0] - 1][index[1]] = gameArray[index[0]][index[1]];
            gameArray[index[0]][index[1]] = 0;
            break;
        case 'down':
            gameArray[index[0] + 1][index[1]] = gameArray[index[0]][index[1]];
            gameArray[index[0]][index[1]] = 0;
            break;
    }
}

function scramble() {
//create an array with values of 1 to the total numbers in the grid

    let tempArray = [];
    for (let i = 0; i<gridSize*gridSize; i++) {
        tempArray.push(i+1);
    }

//randomly arrange the numbers in the above array
//randomly select any index between 2 to the highest number. 
//For e.g. say grid size is 3x3. So tiles will be from 1 to 9
//loop from last tile to tile 2, exchanging with any randomly chosen tile(index) from tile 2 to 9.
//first iteration: exchange tempArray[8] with tempArray [index between 2 and 9]. In 2nd iter, exchange tempArray[7], with something between 2 and 7
//remember 1st tile should always be 1. So don't include tempArray[0] in the loop

    for (let i = gridSize*gridSize-1; i>0; i--) {
        valToExchange = Math.floor(Math.random()*i+1);
        let temp = tempArray[i];
        tempArray[i] = tempArray[valToExchange];
        tempArray[valToExchange] = temp;
    }

//assign the above randomized temparray to game array

    for (let i = 1; i<= gridSize; i++) {
        for (let j = 1; j<= gridSize; j++) {
            let index = j + (i-1)*(gridSize);
            gameArray[i][j] = tempArray[index-1];
        }
    }
}
//if using image, keep a selection button on top to revert to numbered tiles
//also eliminate borders between tiles if playing with custom image
