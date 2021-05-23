class UI {
    constructor() {
        this.gameDiv = document.getElementById("game-div");
    }

    clearGrid() {
        this.gameDiv.innerHTML = '';
    }

    generateGrid() {
        for (let i = 0; i < gridSize + 2; i++) {
            let gridColDiv = document.createElement("div");
            gridColDiv.classList.add('grid-col');
            this.gameDiv.appendChild(gridColDiv);
            for (let j = 0; j < gridSize + 2; j++) {
                let gridCellDiv = document.createElement('div');
                gridCellDiv.classList.add('border', 'play-area');
                (i === 0 || i === gridSize + 1) ? gridCellDiv.style.width = `30px` : gridCellDiv.style.width = `${gameCellSize}px`;
                j === 0 ? gridCellDiv.style.height = `30px` : gridCellDiv.style.height = `${gameCellSize}px`;
                this.gameDiv.children[i].appendChild(gridCellDiv);
                if (j === 0) {
                    if (i !== 0 && i !== gridSize + 1) {
                        this.gameDiv.children[i].children[0].innerHTML = `<p class='tag'>C${i}</p>`;
                    }
                }
                if (i === 0) {
                    if (j !== 0) this.gameDiv.children[i].children[j].innerHTML = `<p class='tag'>R${j}</p>`;
                }
                if ((i > 0 && i < gridSize + 1 && j > 0 && j<gridSize+1) || (j===gridSize+1 && i === gridSize)) {
                    gridCellDiv.classList.add('slide-area');
                }
                if (i > 0 && j > 0 && i < gridSize + 1) {
                    let gameCell = this.gameDiv.children[i].children[j];
                    if (j < gridSize + 1) {
                        let gridImg = document.createElement("IMG");
                        gridImg.src = `images/${gameArray[j][i]}.png`;
                        if (!(j === gridSize + 1 && i === gridSize)) {
                            gridImg.classList.add('img-tag');
                            gridImg.setAttribute('id', `${gameArray[j][i]}`);
                        }
                        gridImg.style.maxWidth = `${gameCellSize-8}px`;
                        gameCell.appendChild(gridImg);
                    }
                    tileMovTracker[gameArray[j][i]] = {
                        xAxis: 0,
                        yAxis: 0
                    };
                }
            }
        }
    }

    //logic as follows:
    //every tile's starting position has x and y coordinate as 0, 0
    //translate moves each tile in increments of the size of the grid - w.r.t to the starting position
    //tileMovTracker tracks how much left, right, up or down each tile has moved w.r.t to its starting position.
    //tileMovTracker is a nested array. Each array item is an object tracking x-coordinate and y-coordinate of each tile
    //there surely is a less complex way to do this?


    moveTile(tileToMove, dir) {
        let tile = document.getElementById(tileToMove);
        switch (dir) {
            case 'left':
                tileMovTracker[tileToMove].xAxis -= 1;
                break;
            case 'right':
                tileMovTracker[tileToMove].xAxis += 1;
                break;
            case 'up':
                tileMovTracker[tileToMove].yAxis -= 1;
                break;
            case 'down':
                tileMovTracker[tileToMove].yAxis += 1;
                break;
        }
        tile.style.transform = `translate(${tileMovTracker[tileToMove].xAxis * gameCellSize}px,${tileMovTracker[tileToMove].yAxis * gameCellSize}px)`;
    }

    statusMessage(message) {
        let statusDiv = document.getElementsByClassName('features')[0];
        let divToInsert = document.createElement('span');
        switch (message) {
            case 'freeplay':
                divToInsert.classList.add('d-block', 'w-100', 'p-2', 'border', 'border-warning', 'text-center');
                divToInsert.innerHTML = `
                Click on "Start New Game" for a new game`;
                statusDiv.appendChild(divToInsert);
                break;
            case 'ignore':
                if (statusDiv.children[1]) this.statusMessageHide();
                divToInsert.classList.add('d-block', 'w-100', 'p-2', 'border', 'text-white', 'bg-danger', 'text-center');
                divToInsert.innerHTML = `
                Clicked tile cannot be moved`;
                statusDiv.appendChild(divToInsert);
                setTimeout(() => { //this has to be an arrow function for 'this' to point to ui object
                    this.statusMessageHide;
                    if (moves === 0) this.statusMessage('first move prompt'); 
                    }, 2000);
                
                break;
            case 'win':
                if (statusDiv.children[1]) this.statusMessageHide();
                divToInsert.classList.add('d-block', 'w-100', 'p-2', 'bg-success', 'text-white', 'text-center');
                divToInsert.innerHTML = `
                Game won in ${moves} moves. Click on "Start New Game" for a new game`;
                statusDiv.children[0].innerHTML = `Moves: ${moves}`;
                statusDiv.appendChild(divToInsert);
                break;
            case 'first move prompt':
                if (statusDiv.children[1]) this.statusMessageHide();
                divToInsert.classList.add('d-block', 'w-100', 'p-2', 'border', 'border-warning', 'text-center');
                divToInsert.innerHTML = `
                Click on tile number ${gridSize*gridSize} to move it to the empty slot`;
                statusDiv.appendChild(divToInsert);
                break;
            default:
                if (statusDiv.children[1]) this.statusMessageHide();
                statusDiv.children[0].innerHTML = `Moves: ${moves}`;
        }
    }

    statusMessageHide() {
        let statusMessage = document.getElementsByClassName('features')[0].children[1];
        if (statusMessage) statusMessage.parentNode.removeChild(statusMessage);
    }
}
