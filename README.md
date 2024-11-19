# Project Odin: Tic Tac Toe

## Credits

## Questions

## Steps I made

1. Let's try to make the console version first. Starting with the board.

```js
// the board will be an array with
// rows x columns (3 x 3 = 9 by default) items

// the board positions (index) can be represented with
// row and column numbers (starting with 0)
// E.g. top left cell index can be calculated by
// row number * numbers of rows + column number
// 0 * 3 + 0 = 0
// bottom right cell would be
// 2 * 3 + 2 = 8

function gameBoard(rows = 3, cols = 3) {
    const cells = Array(rows * cols).fill(" ");

    const getCellValue = (position) => cells[position];

    const setCellValue = (position, mark) => {
        cells[position] = mark;
    };

    const display = () => {
        for (let i = 0; i < rows; i++) {
            let row = "|";
            for (let j = 0; j < cols; j++) {
                row += cells[i * rows + j] + "|";
            }
            console.log(row);
        }
    };

    return {
        display,
        getCellValue,
        setCellValue,
    };
}

// testing
const myGameBoard = gameBoard();
myGameBoard.setCell(0, "X");
myGameBoard.setCell(4, "O");
myGameBoard.setCell(8, "X");
myGameBoard.display();
```

2. Let's make the player object factory function.

```js
function player(name = "Player 1", token = "X") {
    let winsCount = 0;

    const getWinsCount = () => winsCount;
    const increaseWinsCountByOne = () => winsCount++;

    const getName = () => name;
    const setName = (newName) => (name = newName);

    const getToken = () => token;
    const setToken = (newToken) => (token = newToken);

    const info = () =>
        console.log(
            `Player name: ${name}, token: ${token}, wins: ${winsCount}`
        );

    return {
        getName,
        setName,
        getToken,
        setToken,
        info,
        getWinsCount,
        increaseWinsCountByOne,
    };
}
```

3. Now the game logic. First the winning conditions, then taking turns.

```js
function gameController() {
    const myGameBoard = gameBoard();
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");
    let gameNumber = 1;
    let currentTurn = player1.getMark();

    const winningConditions = [
        // rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonals
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkForWin = () => {
        const mark = currentTurn;
        for (winningCondition of winningConditions) {
            if (
                myGameBoard.getCellValue(winningCondition[0]) === mark &&
                myGameBoard.getCellValue(winningCondition[1]) === mark &&
                myGameBoard.getCellValue(winningCondition[2]) === mark
            ) {
                return true;
            }
        }
        return false;
    };

    const playTurn = () => {
        myGameBoard.setCellValue(0, player1.getMark());
        myGameBoard.setCellValue(1, player1.getMark());
        myGameBoard.setCellValue(2, player1.getMark());

        myGameBoard.setCellValue(3, player2.getMark());
        myGameBoard.setCellValue(4, player2.getMark());
        myGameBoard.setCellValue(8, player2.getMark());

        myGameBoard.display();

        if (checkForWin) {
            console.log(`${currentTurn} player won!`);
        }
    };

    return {
        playTurn,
    };
}

// testing
const myGameController = gameController();
myGameController.playTurn();
```
