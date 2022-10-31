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
        const [player1Arrow, player2Arrow] = document.querySelectorAll('.arrow');
        player2Arrow.classList.toggle('hidden');
        player1Arrow.classList.toggle('hidden');
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

        //Check for imminent losses
        let {xMatrices} = updateContainers();
        let choiceMade = false;

        xMatrices.alongRows.forEach((count, index) =>{
            if (count == 2) {
                gameCells.forEach((cell)=>{
                    if (cell.y == index){
                        if (cell.innerText == ""){
                            click(cell, "bot");
                            choiceMade = true;
                        }
                    }
                });
            }
        });
        if (choiceMade == false){
            xMatrices.alongColumns.forEach((count, index)=>{
                if (count == 2) {
                    gameCells.forEach((cell)=>{
                        if (cell.x == index) {
                            if (cell.innerText == ""){
                                click(cell, "bot");
                                choiceMade = true;
                            }
                        }
                    });
                }
            });
        }
        if (choiceMade == false){
            if (xMatrices.alongDiagonal == 2) {
                gameCells.forEach((cell)=>{
                    if (cell.x == cell.y){
                        if (cell.innerText == ""){
                            click(cell, "bot");
                            choiceMade = true;
                        }
                    }
                });
            }
        } 
        if (choiceMade == false){
            if (xMatrices.oppositeDiagonal == 2) {
                gameCells.forEach((cell)=>{
                    if (cell.x + cell.y == 2){
                        if (cell.innerText == ""){
                            click(cell, "bot");
                            choiceMade = true;
                        }
                    }
                });
            }    
        }
        if (choiceMade == false) {
            if (emptyCells.length){
                let chosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                click(chosenCell, "bot");
            }
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

    //Returns objects of matrices for X and O to detect how many marks are in a column, row, or diagonal.
    function updateContainers() {
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
        return {
            xMatrices,
            oMatrices
        }
    }

    function checkForWin() {
        
        let {xMatrices, oMatrices} = updateContainers();

        let winnerDeclared = false;

        xMatrices.alongRows.forEach((count) =>{
            if (count == 3) {
                declareWinner(players[0].name);
                winnerDeclared = true;
            }
        });
        xMatrices.alongColumns.forEach((count)=>{
            if (count == 3) {
                declareWinner(players[0].name);
                winnerDeclared = true;
            }
        });
        if (xMatrices.alongDiagonal == 3) {
            declareWinner(players[0].name);
            winnerDeclared = true;
        } else if (xMatrices.oppositeDiagonal == 3) {
            declareWinner(players[0].name);
            winnerDeclared = true;
        }

        oMatrices.alongRows.forEach((count) =>{
            if (count == 3) {
                declareWinner(players[1].name);
                winnerDeclared = true;

            }
        });
        oMatrices.alongColumns.forEach((count)=>{
            if (count == 3) {
                declareWinner(players[1].name);
                winnerDeclared = true;
            }
        });
        if (oMatrices.alongDiagonal == 3) {
            declareWinner(players[1].name);
            winnerDeclared = true;
        } else if (oMatrices.oppositeDiagonal == 3) {
            declareWinner(players[1].name);
            winnerDeclared = true;
        }

        //check for tie
        if (winnerDeclared == false) {
            let tie = true;
            gameCells.forEach((cell)=>{
                if (!(cell.innerText)) {
                    tie = false;
                }
            });
            if (tie) {
                declareWinner("tie");
            }
        }

    } 

    function declareWinner(winner) {
        console.log(winner + " is the WINNER!");
        const displayWinner = document.querySelector('.displayWinner');
        const replay = document.querySelector('.replay');

        replay.classList.add('visible');
        replay.addEventListener('click', ()=>{
            location.reload();
        });

        if (winner == "tie") {
            displayWinner.innerText = "It's a tie!"
        } else {
            displayWinner.innerText = winner + " has won!!";
        }

        gameCells.forEach((cell)=>{
            cell.classList.add('fade');
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

