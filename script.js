// 1
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
        if (cells[position] !== " ") {
            console.log("Not available");
            return;
        }
        cells[position] = mark;
    };

    const getCells = () => cells;

    // 12
    const getAvailableCells = () => {
        let availableCells = [];
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] === " ") {
                availableCells.push(i);
            }
        }
        return availableCells;
    };

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
        getAvailableCells,
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
            // 11
            cellButtons.forEach((cellButton) => (cellButton.disabled = true));
        }

        // 12
        if (myGameBoard.getAvailableCells().length === 0) {
            statusDisplay.textContent = "It's a tie!";
        }

        // 10
        cellButtons[position].disabled = true;

        myGameController.switchTurn();
    };

    cellButtons.forEach((cellButton) => {
        cellButton.addEventListener("click", handleCellButtonClick);
    });
})();

// testing
