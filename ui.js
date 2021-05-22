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
                        gridImg.style.maxWidth = `${gameCellSize - 5}px`;
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
        let divToInsert = document.createElement('div');
        divToInsert.classList.add('status-message');
        switch (message) {
            case 'freeplay':
                divToInsert.innerHTML = `
                <p>Click on "Start New Game" for a new game</p>`;
                statusDiv.appendChild(divToInsert);
                break;
            case 'ignore':
                if (statusDiv.children[1]) this.statusMessageHide();
                divToInsert.style.backgroundColor = 'teal';
                divToInsert.style.color = 'white';
                divToInsert.innerHTML = `
                <p>Clicked tile cannot be moved</p>`;
                statusDiv.appendChild(divToInsert);
                setTimeout(this.statusMessageHide, 2000);
                break;
            case 'win':
                if (statusDiv.children[1]) this.statusMessageHide();
                divToInsert.innerHTML = `
                <p>Game won in ${moves} moves. Click on "Start New Game" for a new game</p>`;
                statusDiv.children[0].innerHTML = `Moves: ${moves}`;
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
