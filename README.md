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

4. Adding some html elements for the screen controller.

```html
<body>
    <h1>Tic Tac Todin</h1>
    <!-- 4 -->
    <div class="score-board">
        <p id="player-1-score">Player 1: <span>0</span></p>
        <p id="player-2-score">Player 2: <span>0</span></p>
    </div>
    <div class="game-board">
        <button id="cell-0"></button>
        <button id="cell-1"></button>
        <button id="cell-2"></button>
        <button id="cell-3"></button>
        <button id="cell-4"></button>
        <button id="cell-5"></button>
        <button id="cell-6"></button>
        <button id="cell-7"></button>
        <button id="cell-8"></button>
    </div>
    <div class="status-display">
        <p>Player 1 Turn</p>
    </div>
</body>
```

5. Adding some basic css.

```css
.score-board {
    display: flex;
    width: 480px;
    margin: 0 auto;
    justify-content: space-between;
}

.game-board {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    margin: 0 auto;
    gap: 1rem;
    width: 480px;
    height: 480px;
}

.status-display p {
    margin-top: 4rem;
    text-align: center;
}
```

6. Let's do the screen controller.
   Starting with grabing all elements and adding event handlers.

```js
const screenController = (() => {
    const myGameController = gameController();

    const player1Score = document.querySelector("#player-1-score");
    const player2Score = document.querySelector("#player-2-score");

    const cellButtons = document.querySelectorAll(".game-board button");

    const statusDisplay = document.querySelector(".status-display p");

    const handleCellButtonClick = (e) => {
        const buttonID = e.target.attributes.id.nodeValue.split("-")[1];
        console.log(buttonID);
    };

    cellButtons.forEach((cellButton) => {
        cellButton.addEventListener("click", handleCellButtonClick);
    });
})();
```

7. The buttons will trigger gameController.playTurn().
   But first, we need to display the game board.
   Also, I'll try to detach the game board out of the game controller.
   Hmmm... I had to go all over the place.

```js
function gameBoard(rows = 3, cols = 3) {
    const cells = Array(rows * cols).fill(" ");

    const getCellValue = (position) => cells[position];

    const setCellValue = (position, mark) => {
        if (cells[position] !== " ") {
            console.log("Not available");
            return;
        }
        cells[position] = mark;
    };

    const getCells = () => cells;

    // this is only console version
    // const display = () => {
    //     for (let i = 0; i < rows; i++) {
    //         let row = "|";
    //         for (let j = 0; j < cols; j++) {
    //             row += cells[i * rows + j] + "|";
    //         }
    //         console.log(row);
    //     }
    // };

    return {
        getCellValue,
        setCellValue,
        getCells,
    };
}

// 2
function player(name = "Player 1", mark = "X") {
    let winsCount = 0;

    const getWinsCount = () => winsCount;
    const increaseWinsCountByOne = () => winsCount++;

    const getName = () => name;
    const setName = (newName) => (name = newName);

    const getMark = () => mark;
    const setMark = (newMark) => (mark = newMark);

    // this is only for console version
    // const info = () =>
    //     console.log(`Player name: ${name}, mark: ${mark}, wins: ${winsCount}`);

    return {
        getName,
        setName,
        getMark,
        setMark,
        getWinsCount,
        increaseWinsCountByOne,
    };
}

// 3
function gameController() {
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

    const getCurrentTurn = () => currentTurn;

    const checkForWin = (gameBoard) => {
        const mark = currentTurn;
        for (eachCondition of winningConditions) {
            if (
                gameBoard.getCellValue(eachCondition[0]) === mark &&
                gameBoard.getCellValue(eachCondition[1]) === mark &&
                gameBoard.getCellValue(eachCondition[2]) === mark
            ) {
                return true;
            }
        }
        return false;
    };

    const switchTurn = () => {
        currentTurn =
            currentTurn === player1.getMark()
                ? player2.getMark()
                : player1.getMark();
    };

    return {
        switchTurn,
        getCurrentTurn,
        checkForWin,
    };
}

// 6
const screenController = (() => {
    const myGameController = gameController();
    const myGameBoard = gameBoard();

    const player1Score = document.querySelector("#player-1-score");
    const player2Score = document.querySelector("#player-2-score");

    const cellButtons = document.querySelectorAll(".game-board button");

    const statusDisplay = document.querySelector(".status-display p");

    const updateDisplay = () => {
        const cells = myGameBoard.getCells();
        cellButtons.forEach((cellButton, index) => {
            cellButton.textContent = cells[index];
        });
    };

    const handleCellButtonClick = (e) => {
        const position = e.target.attributes.id.nodeValue.split("-")[1];
        const currentTurn = myGameController.getCurrentTurn();

        myGameBoard.setCellValue(position, currentTurn);

        updateDisplay();

        if (myGameController.checkForWin(myGameBoard)) {
            statusDisplay.textContent = `${
                currentTurn === "X" ? "Player 1" : "Player 2"
            } won!`;
        }

        myGameController.switchTurn();
    };

    cellButtons.forEach((cellButton) => {
        cellButton.addEventListener("click", handleCellButtonClick);
    });
})();
```

8. Let's get the X and O's bigger.

```css
.game-board button {
    font-size: 5rem;
}
```

9. Let's make the status / announcement display bigger.

```css
.status-display p {
    margin-top: 4rem;
    text-align: center;
    /* 9 */
    font-size: 2rem;
}
```

10. Let's disable the button when played / clicked.

```js
const handleCellButtonClick = (e) => {
    ...

    cellButtons[position].disabled = true;

    myGameController.switchTurn();
};
```

11. Also, when the game is finished.

```js
const handleCellButtonClick = (e) => {
    ...

    if (myGameController.checkForWin(myGameBoard)) {
        statusDisplay.textContent = `${
            currentTurn === "X" ? "Player 1" : "Player 2"
        } won!`;
        // 11
        cellButtons.forEach((cellButton) => (cellButton.disabled = true));
    }

    ...
};
```

12. What about when it's a tie?
    One way to do this, is to check how many cells are available.

```js
// gameBoard.getAvailableCells()
const getAvailableCells = () => {
    let availableCells = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === " ") {
            availableCells.push(i);
        }
    }
    return availableCells;
};

// inside of screenController.handleCellButtonClick()
if (myGameBoard.getAvailableCells().length === 0) {
    statusDisplay.textContent = "It's a tie!";
}
```

13. Let's update the score.
    I think it's better to detach player objects out of gameController.

14. Let's make a replay button. And a restart button.

15. Menu? Adding a dialog. Updating some js and css. Also Odin mode!
