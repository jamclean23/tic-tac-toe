//Javascript

//TO DO LIST
//

/*VARIABLES-------------------------------------------------------------------------*/

const gameCells = document.querySelectorAll('.cell');
const readyButton = document.querySelector('.ready');
const modal = document.querySelector('.modal');



/*MODULES--------------------------------------------------------------------------*/

let gameBoard = (function() {
    let cellsStatus = [];
    let players = [];
    let turn;

    function getTurn() {
        console.log(turn);
    }

    function toggleTurn() {
        if (turn == players[0]) {
            turn = players[1];
        } else {
            turn = players[0];
        }
        if (turn.type == "bot") {
            startBotTurn();
        }
    }

    function startBotTurn() {
        let emptyCells = [];
        gameCells.forEach((cell) =>{
            if (cell.innerText == "") {
                emptyCells.push(cell);
            }
        });
        if (emptyCells.length){
            let chosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            click(chosenCell, "bot");
        }
    }

    function initializeGameCells() {
        gameCells.forEach((cell, index)=>{
            cell.addEventListener('click', (event)=>{
                click(cell, "human");
            })
        });
    }

    function click(clickedCell, playerType) {
        if (!(clickedCell.innerText)) {
            if ((turn.marker == "X") && (playerType == "human") && (turn.type == "human")) {
                clickedCell.innerText = "X";
                gameBoard.toggleTurn();
            } else if ((turn.marker == "O") && (playerType == "human") && (turn.type == "human")) {
                clickedCell.innerText = "O";
                gameBoard.toggleTurn();
            } else if ((playerType == "bot") && (turn.type == "bot")) {
                clickedCell.innerText = "O";
                gameBoard.toggleTurn();
            }
        }
        checkForWin();
    }

    function checkForWin() {
        let xMatrices = {
            alongRows: [0, 0, 0],
            alongColumns: [0, 0, 0],
            alongDiagonal: 0,
            oppositeDiagonal: 0

        };
        let oMatrices = {
            alongRows: [0, 0, 0],
            alongColumns: [0, 0, 0],
            alongDiagonal: 0,
            oppositeDiagonal: 0

        };

            gameCells.forEach((cell, index) => {
                    if (index <= 2) {
                        cell.x = index;
                        cell.y = 0;
                    } else if (index >= 3 && index <= 5) {
                        cell.x = index - 3;
                        cell.y = 1;
                    } else if (index >= 6) {
                        cell.x = index -6;
                        cell.y = 2;
                    }
                    if (cell.innerText == "X") {
                        xMatrices.alongRows[cell.y]++
                        xMatrices.alongColumns[cell.x]++;
                        if (cell.y == cell.x) {
                            xMatrices.alongDiagonal++;
                        }
                        if (cell.y + cell.x == 2) {
                            xMatrices.oppositeDiagonal++;
                        }
                    } else if(cell.innerText == "O") {
                        oMatrices.alongRows[cell.y]++
                        oMatrices.alongColumns[cell.x]++;
                        if (cell.y == cell.x) {
                            oMatrices.alongDiagonal++;
                        }
                        if (cell.y + cell.x == 2) {
                            oMatrices.oppositeDiagonal++;
                        }
                    }
            });

            xMatrices.alongRows.forEach((count) =>{
                if (count == 3) {
                    declareWinner("X");
                }
            });
            xMatrices.alongColumns.forEach((count)=>{
                if (count == 3) {
                    declareWinner("X");
                }
            });
            if (xMatrices.alongDiagonal == 3) {
                declareWinner("X");
            } else if (xMatrices.oppositeDiagonal == 3) {
                declareWinner("X");
            }

            oMatrices.alongRows.forEach((count) =>{
                if (count == 3) {
                    declareWinner("O");
                }
            });
            oMatrices.alongColumns.forEach((count)=>{
                if (count == 3) {
                    declareWinner("O");
                }
            });
            if (oMatrices.alongDiagonal == 3) {
                declareWinner("O");
            } else if (oMatrices.oppositeDiagonal == 3) {
                declareWinner("O");
            }

        } 

    function declareWinner(winner) {
        console.log(winner + " is the WINNER!");
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
        players,
        getTurn
    }
})();

let appModule = (function() {
    function initialize() {
        readyButton.addEventListener('click', ()=>{
            const inputs = document.querySelectorAll('input[type="text"]');
            const playerType = document.querySelector('input[name="player2Type"]:checked').value;
            createPlayer(inputs[0].value, "human", "X");
            createPlayer(inputs[1].value, playerType, "O");
            modal.classList.toggle('visible');
            populatePlayerCards();
            gameBoard.toggleTurn();
        });
    }
    function populatePlayerCards() {
        const [player1, player2] = document.querySelectorAll('.playerCard > h2');
        player1.innerText = gameBoard.players[0].name;
        player2.innerText = gameBoard.players[1].name;
    }

    function createPlayer(name, type, marker) {
        if (type == "bot") {
            name = "Bot";
        }
        gameBoard.players.push({name, type, marker});
        return {
            name,
            type,
            marker
        }
    }

    return {
        initialize
    }
})();



/*MAIN SECTION---------------------------------------------------------------------*/

appModule.initialize();
gameBoard.initializeGameCells();

