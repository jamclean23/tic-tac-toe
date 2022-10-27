//Javascript

//TO DO LIST
//

/*VARIABLES-------------------------------------------------------------------------*/

const gameCells = document.querySelectorAll('.cell');


/*MODULES--------------------------------------------------------------------------*/

let gameBoard = (function() {
    let cellsStatus = ["X", "X", "O", "X", "O", "O", "X", "O", "X"];
    let players = [];
    let turn = players[0];

    function addPlayer(player) {
        players.push(player);
    }

    function toggleTurn() {
        if (this.turn == players[0]) {
            this.turn = players[1];
        } else {
            this.turn = players[0];
        }
    }

    function initializeGameCells() {
        gameCells.forEach((cell, index)=>{
            cell.addEventListener('click', (event)=>{
            })
        });
    }

    function updateGameBoard() {
        gameCells.forEach((cell, index)=>{
            cell.innerText = cellsStatus[index];
        });
    
    }

    return {
        cellsStatus,
        initializeGameCells,
        updateGameBoard,
        toggleTurn,
        turn,
        players,
        addPlayer
    }
})();

/*FACTORY FUNCTIONS---------------------------------------------------------------*/

function createPlayer(name, type, marker) {
    return {
        name,
        type,
        marker
    }
}

/*GLOBAL FUNCTIONS-----------------------------------------------------------------*/


/*MAIN SECTION---------------------------------------------------------------------*/

gameBoard.initializeGameCells();
gameBoard.updateGameBoard();
console.clear();
