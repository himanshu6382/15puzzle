class UI {
    constructor() {
        this.gameDiv = document.getElementById("game-div");        
    }

    generateGrid(grid) {
        console.log("game generated");
        for (let i = 0; i < grid + 2; i++) {
            let gridColDiv = document.createElement("div");
            gridColDiv.classList.add('grid-col');
            this.gameDiv.appendChild(gridColDiv);
            for (let j = 0; j < grid + 1; j++) {
                let gridCellDiv = document.createElement('div');
                gridCellDiv.classList.add('border', 'play-area');
                i === grid + 1 ? gridCellDiv.style.width = `30px` : gridCellDiv.style.width = `${gameCellSize}px`;
                j === 0 ? gridCellDiv.style.height = `30px` : gridCellDiv.style.height = `${gameCellSize}px`;
                this.gameDiv.children[i].appendChild(gridCellDiv);
                if (j === 0) {
                    if (i !== 0 && i !== grid + 1) {
                        this.gameDiv.children[i].children[0].innerHTML = `<p class='tag'>C${i}</p>`;
                    }
                }
                if (i === grid + 1) {
                    if (j !== 0) this.gameDiv.children[grid + 1].children[j].innerHTML = `<p class='tag'>R${j}</p>`;
                }
                if ((i === 0 && j === 1) || (i > 0 && i < grid + 1 && j > 0)) {
                    gridCellDiv.classList.add('slide-area');
                }
                if (i > 0 && j > 0 && i < grid + 1) {
                    let gameCell = this.gameDiv.children[i].children[j];
                    let gridImg = document.createElement("IMG");
                    gridImg.src = `images/${gameArray[j][i]}.png`;
                    gridImg.classList.add('img-tag');
                    gridImg.setAttribute('id', `${(i) + grid * (j - 1)}`);
                    gridImg.style.maxWidth = `${gameCellSize-5}px`;
                    gameCell.appendChild(gridImg);
                    tileMovTracker[gameArray[j][i]]=[0,0];
                }
            }
        }
    }

    moveTile(tileToMove, dir) {
        let tile = document.getElementById(tileToMove);
        switch(dir) {
            case 'left':
                tileMovTracker[tileToMove][0]-=1;
                break;
            case 'right':
                tileMovTracker[tileToMove][0]+=1;
                break;
            case 'up':
                tileMovTracker[tileToMove][1]-=1;
                break;
            case 'down':
                tileMovTracker[tileToMove][1]+=1;
                break;
        }
        tile.style.transform = `translate(${tileMovTracker[tileToMove][0]*gameCellSize}px,${tileMovTracker[tileToMove][1]*gameCellSize}px)`;
    }
}  
