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

    const updateCell = (position, token) => {
        cells[position] = token;
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
        updateCell,
    };
}

// testing
const myGameBoard = gameBoard();
myGameBoard.updateCell(0, "X");
myGameBoard.updateCell(4, "O");
myGameBoard.updateCell(8, "X");
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
