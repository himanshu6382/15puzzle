let gameState = 0;
let gridSize = 3;
const ui = new UI;
let gameArray = [];
let tileMovTracker = [];
let tile = 0;
let gameCellSize = 360 / gridSize;
createGameArray();
ui.generateGrid(gridSize);

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

ui.gameDiv.addEventListener('click', function (e) {
    //check which tile is clicked
    if (parseInt(e.target.id)) {
        tileToMove = e.target.id;
        let tileIndex = getTileIndex(tileToMove);//get index of tileToMove in gameArray
        // console.log(`tile index is: ${tileIndex}`);
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
    ui.clearGrid();
    ui.generateGrid(gridSize);
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