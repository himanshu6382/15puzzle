let gameState = 0;
let gridSize = 3;
const ui = new UI;
let gameArray = [];
const tileMovTracker = [];
//let tile = 0;
let gameCellSize = 260 / (gridSize);
let moves = 0;
createGameArray();
ui.generateGrid();
ui.statusMessage('freeplay');

ui.gameDiv.addEventListener('click', function (e) {
    //check which tile is clicked
    if (parseInt(e.target.id)) {
        let tileToMove = e.target.id;
        let tileIndex = getTileIndex(parseInt(tileToMove), gameArray);//get index of tileToMove in gameArray
        console.log(tileIndex);
        //check in game array if there is an empty slot around it and assign dir accordingly
        let dir = getMoveDir(tileIndex);
        updateGameArray(tileIndex, dir);
        if (dir != 'ignore') {
            if (gameState === 1) {
                moves+=1;
                let gameComplete = checkGame();
                if (gameComplete) {
                    ui.statusMessage('win');
                    gameState = 0;
                } else {
                    ui.statusMessage(dir);
                }
            }
            ui.moveTile(tileToMove, dir);
        } else {
            if (gameState===1) ui.statusMessage(dir);
        }
    }
});

document.getElementById('game-init').addEventListener('click', function (e) {
    let gridSizeOptions = document.getElementById('grid-size-selector').children;
    for (size of gridSizeOptions) {
        let option = size.children[0];
        if (option.checked) gridSize = parseInt(option.value);
    }
    initiateGame();
});

document.addEventListener('keyup', (e) => {
    let key = e;
    let keyboardMov = tileToMoveOnKeyPress(e.key);;
    if (keyboardMov.dirToMove) {
        let tileToMove = gameArray[keyboardMov.tileToMove[0]][keyboardMov.tileToMove[1]];
        updateGameArray(keyboardMov.tileToMove, keyboardMov.dirToMove);
        if (gameState ===1) {
            moves+=1;
            let gameComplete = checkGame();
            if (gameComplete) {
                ui.statusMessage('win');
                gameState = 0;
            } else {
                ui.statusMessage(keyboardMov.dirToMove)
            }
        }
        ui.moveTile(tileToMove, keyboardMov.dirToMove);
    }
});

function initiateGame(){
    gameCellSize = 260 / gridSize;
    moves = 0;
    tile = 0;
    gameState = 1;
    createGameArray();
    scramble();
    checkSolvability();
    console.log(`Game score is ${gameScore()}`)
    ui.clearGrid();
    ui.generateGrid(gridSize);
    ui.statusMessage();
    
    
}

function createGameArray() {
    for (let i = 0; i < gridSize + 2; i++) {
        gameArray[i] = new Array();
        for (let j = 0; j < gridSize + 2; j++) {
            if ((i === 0 || i === gridSize + 1 && j !== gridSize+1) || (j === 0 || j === gridSize+1)) {
                gameArray[i].push('na');
            } else {
                gameArray[i].push(j+(i-1)*gridSize);
            }
        }
    }
    gameArray[gridSize+1][gridSize] = 0;
    // console.log(gameArray);
}

function getTileIndex(value, game) {
    let row, col;
    for (row = 1; row <= gridSize + 1; row++) {
        col = game[row].indexOf(value);
        if (col !== -1) {
            return ([row, col]);
        }
    }
}

function getMoveDir(tileIndex) {

    // console.log(gameArray[tileIndex[0]+1][tileIndex[1]])
   if (gameArray[tileIndex[0] - 1][tileIndex[1]] === 0) {
        return 'up'
    } else if ((gameArray[tileIndex[0] + 1][tileIndex[1]] === 0)) {
        return 'down'
    } else if (gameArray[tileIndex[0]][tileIndex[1] - 1] === 0) {
        return 'left'
    } else if (gameArray[tileIndex[0]][tileIndex[1] + 1] === 0) {
        return 'right'
    } else return 'ignore'
}

function updateGameArray(index, dir) {
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
    let parity = 0;
    let tempArray = [];
    for (let i = 0; i<gridSize*gridSize; i++) {
        tempArray.push(i+1);
    }

//randomly arrange the numbers in the above array - index from 0 to gridSize^2-1
//randomly select any index between 2 to the highest number.
//For e.g. say grid size is 3x3. So tiles will be from 1 to 9. Stored in tempArray[0,1,..,8]
//loop on tempArray. For tempArray[8], swap it with any randomly chosen tile between tempArray[1] and tempArray[8].
//Then swap tempArray[7] with any randomly chosen tile between tempArray[1] and tempArray[7].
//So on till you reach tile tempArray[2]. Here you have to check parity of the scrambled puzzle.
//The puzzle will be solvable only for even parity - i.e. if number of swaps are even in number. So check for parity. If it is even swap tempArray[1] and tempArray[2]
//remember 1st tile should always be 1. So don't include tempArray[0] in the loop

    for (let i = gridSize*gridSize-2; i>=0; i--) {
        if (i>1) {
            valToExchange = Math.ceil(Math.random()*i-1);
            let temp = tempArray[i];
            tempArray[i] = tempArray[valToExchange];
            tempArray[valToExchange] = temp;
            if (valToExchange != i) parity+=1;
        } else {
            if (parity%2 != 0) {
                temp = tempArray[i];
                tempArray[i] = tempArray[1];
                tempArray[1] = temp;
            }
        }
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

function checkGame() {
    for (i=1; i<=gridSize; i++) {
        for (j=1; j<=gridSize; j++) {
            if( gameArray[i][j] !== j+ (i-1)*gridSize) return(false);
        }
    }
    return(true);    
}

function gameScore() {
    let score = 0;
    for (i = 1; i<= gridSize; i++) {
        for (j = 1; j<=gridSize; j++){
            let currPos = getTileIndex(j+(i-1)*gridSize, gameArray);
            score = score + Math.abs(currPos[0] - i) + Math.abs(currPos[1] - j);
        }
    }
    return score;
}

function scrambleTest() {
    gridSize = 3;
    gameArray[0] = ['na', 'na', 'na', 'na', 'na'];
    gameArray[1] = ['na', 1, 2, 3, 'na'];
    gameArray[2] = ['na', 4, 6, 8, 'na'];
    gameArray[3] = ['na', 7, 5, 9, 'na'];
    gameArray[4] = ['na', 'na', 'na', 0, 'na'];
}

// function scrambleTest() {
//     gridSize = 3;
//     gameArray[0] = ['na', 'na', 'na', 'na', 'na'];
//     gameArray[1] = [0, 1, 5, 3, 'na'];
//     gameArray[2] = ['na', 2, 4, 6, 'na'];
//     gameArray[3] = ['na', 7, 8, 9, 'na'];
//     gameArray[4] = ['na', 'na', 'na', 'na', 'na'];
// }

function tileToMoveOnKeyPress(key) {
    let emptyIndex = getTileIndex(0, gameArray);
    let dirToMove;
    let tileToMove = []
    switch (key) {
        case 'ArrowLeft':
            if (gameArray[emptyIndex[0]][emptyIndex[1]+1] != 'na') {
                dirToMove = 'left';
                tileToMove = [emptyIndex[0], emptyIndex[1]+1]
            }
            break;
        case 'ArrowRight':
            if (gameArray[emptyIndex[0]][emptyIndex[1]-1] != 'na') {
                dirToMove = 'right';
                tileToMove = [emptyIndex[0], emptyIndex[1]-1]
            }
            break;
        case 'ArrowUp':
            if (emptyIndex[0] <= gridSize && gameArray[emptyIndex[0]+1][emptyIndex[1]] !== 'na') {
                dirToMove = 'up';
                tileToMove = [emptyIndex[0]+1, emptyIndex[1]]
            }
            break;
        case 'ArrowDown':
            if (gameArray[emptyIndex[0]-1][emptyIndex[1]] != 'na') {
                dirToMove = 'down';
                tileToMove = [emptyIndex[0]-1, emptyIndex[1]]
            }
            break;
    }
    return {
        dirToMove,
        tileToMove
    };
}

function checkSolvability() {
    let parity = 0;
    let checkArray = new Array();
    for (i = 1; i<=gridSize; i++){
        checkArray[i] = Array.from(gameArray[i]);
    }
    for (i = 1; i<=gridSize; i++) {
        for (j = 1; j<=gridSize; j++) {
            if (!(i===1 && j===1)) {
               let currTile = checkArray[i][j];
               let corrTilePos = getTileIndex(j+(i-1)*gridSize, checkArray);
               if (!(corrTilePos[0] === i && corrTilePos[1] === j)) {
                   checkArray[corrTilePos[0]][corrTilePos[1]] = currTile;
                   checkArray[i][j] = j+(i-1)*gridSize;
                   parity+=1;
               } 
            }
        }
    }
    (parity%2 === 0)? console.log("solvable"): console.log("unsolvable");
}