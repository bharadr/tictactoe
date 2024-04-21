

function createUser(name, symbol) {
    return {name, symbol}
}

function createBoard() {
    let boardArr = [
        ['*', '*', '*'],
        ['*', '*', '*'],
        ['*', '*', '*'],
    ];

    let checkValidMove = function(row, column) {
        return boardArr[row][column] === '*';
    }

    let placeMove = function(symbol, row, column) {
        boardArr[row][column] = symbol;
        let properId = "button_" + Number(row * 3 + column);
        document.getElementById(properId).innerText = symbol;
    }

    let checkForWin = function() {
        // Check Horizontal Win conditions
        for (let i = 0; i < 3; i++) {
            let uniqueLetters = new Set()
            uniqueLetters.add(boardArr[i][0])
            uniqueLetters.add(boardArr[i][1])
            uniqueLetters.add(boardArr[i][2])
            if (uniqueLetters.size === 1 && !uniqueLetters.has("*")) {
                return true;
            }
        }

        // Check Vertical Win conditions
        for (let i = 0; i < 3; i++) {
            let uniqueLetters = new Set()
            uniqueLetters.add(boardArr[0][i])
            uniqueLetters.add(boardArr[1][i])
            uniqueLetters.add(boardArr[2][i])
            if (uniqueLetters.size === 1 && !uniqueLetters.has("*")) {
                return true;
            }
        }

        let uniqueLetters = new Set()
        uniqueLetters.add(boardArr[0][0])
        uniqueLetters.add(boardArr[1][1])
        uniqueLetters.add(boardArr[2][2])
        if (uniqueLetters.size === 1 && !uniqueLetters.has("*")) {
            return true;
        }

        let uniqueLetters2 = new Set()
        uniqueLetters2.add(boardArr[2][0])
        uniqueLetters2.add(boardArr[1][1])
        uniqueLetters2.add(boardArr[0][2])
        if (uniqueLetters2.size === 1 && !uniqueLetters2.has("*")) {
            return true;
        }
        
        return false
    }

    return {placeMove, checkForWin, checkValidMove}
}

function createGame() {
    let board = createBoard();
    let numMoves = 0;
    let p1 = createUser('Player1', 'X');;
    let p2 = createUser('Player2', 'O');
    let gameActive = false;

    function updateMessage(string) {
        document.getElementById("status").innerText = string;
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Set up the start / reset button
        let startButton = document.getElementById('startButton');
        startButton.addEventListener('click', function() {
            // Clean Up the Board 
            board = createBoard();
            let buttons = document.querySelectorAll('.row button');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].innerText = '';
            }
            numMoves = 0;
            let p1name = String(document.getElementById('p1name').value);
            let p2name = String(document.getElementById('p2name').value);
            if (p1name.length > 0) {
                p1 = createUser(p1name, 'X')
            }
            if (p2name.length > 0) {
                p2 = createUser(p2name, 'O')
            }
            gameActive = true;
            updateMessage("The Game has started!")
        })
        // Set up the board buttons
        let buttons = document.querySelectorAll('.row button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                if (!gameActive) {
                    return;
                }
                let num = Number(String(this.id).charAt(String(this.id).length-1))
                let col = num % 3;
                let row = Math.floor(num / 3);

                let currPlayer = (numMoves % 2 === 0) ? p1 : p2
                updateMessage(currPlayer.name + " selects row: " + row + " col: " + col)
                if (!board.checkValidMove(row, col)) {
                    updateMessage("Invalid Move by " + currPlayer.name + ". Try again!");
                } else {
                    board.placeMove(currPlayer.symbol, row, col);
                    let result1 = board.checkForWin();
                    if (result1) {
                        updateMessage(currPlayer.name + ' won the game!')
                        gameActive = false;
                    }
                    numMoves++;
                    if (numMoves >= 9 && gameActive) {
                        updateMessage("Looks like no more moves can be played! Tie game!")
                        gameActive = false;
                    }
                }
            });
        }
    });
}

let game = createGame();

