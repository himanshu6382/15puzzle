let grid = 4;
let gameState = 1;
let gameDiv = document.getElementById("game-div");
gameDiv.style.height = '450px';
gameDiv.style.backgroundColor = 'blue';
let gameCellSize = Math.floor(360 / grid);

function generateGrid() {
    for (let i = 0; i < grid + 2; i++) {
        gridColDiv = document.createElement("div");
        gridColDiv.classList.add('grid-col');
        gameDiv.appendChild(gridColDiv);
        for (let j = 0; j < grid + 1; j++) {
            gridCellDiv = document.createElement('div');
            gridCellDiv.classList.add('border', 'play-area');
            i === grid + 1 ? gridCellDiv.style.width = `30px` : gridCellDiv.style.width = `${gameCellSize}px`;
            j === 0 ? gridCellDiv.style.height = `30px` : gridCellDiv.style.height = `${gameCellSize}px`;
            gameDiv.children[i].appendChild(gridCellDiv);
            if (j === 0) {
                if (i !== 0 && i !== grid + 1) {
                    gameDiv.children[i].children[0].innerHTML = `<p class='tag'>C${i}</p>`;
                }
            }
            if (i === grid + 1) {
                if (j !== 0) gameDiv.children[grid + 1].children[j].innerHTML = `<p class='tag'>R${j}</p>`;
            }
            if ((i === 0 && j === 1) || (i > 0 && i < grid + 1 && j > 0)) {
                gridCellDiv.classList.add('slide-area');
            }
            if (i > 0 && j > 0 && i < grid + 1) {
                let gameCell = gameDiv.children[i].children[j];
                let gridImg = document.createElement("IMG");
                gridImg.src = `images/${(i) + grid * (j - 1)}.png`;
                gridImg.classList.add('img-tag');
                gridImg.setAttribute('id', `${(i) + grid * (j - 1)}`);
                gridImg.style.maxWidth = `${gameCellSize - 10}px`;
                gameCell.appendChild(gridImg);
            }
        }
    }
};

generateGrid();

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