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

// gameBoard handles all cells status
// - get / set cell values
// - get cells
// - get available cells
function gameBoard(rows = 3, cols = 3) {
    let cells = Array(rows * cols).fill(" ");

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

    // 14
    const resetBoard = () => {
        cells = Array(rows * cols).fill(" ");
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
        resetBoard,
    };
}

// 2
// player handles player name, scores
// - get wins count
// - increse wins count
// - get / set name
// - get / set mark
function player(name = "Player 1", mark = "X") {
    let winsCount = 0;

    const getWinsCount = () => winsCount;
    const increaseWinsCountByOne = () => winsCount++;

    const getName = () => name;
    const setName = (newName) => (name = newName);

    const getMark = () => mark;
    const setMark = (newMark) => (mark = newMark);

    // 14
    const resetWinsCount = () => {
        winsCount = 0;
    };

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
        resetWinsCount,
    };
}

// 3
// gameController handles winning condition and turns
// - get current turn
// - check for win
// - switch turn
function gameController() {
    let currentTurn = "X";

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

    const odinPlays = () => {};

    // 13
    const switchTurn = () => {
        currentTurn = currentTurn === "X" ? "O" : "X";
    };

    const reset = () => {
        currentTurn = "X";
    };

    return {
        switchTurn,
        getCurrentTurn,
        checkForWin,
        reset,
        odinPlays,
    };
}

// 6
// screenController handles player interactions, buttons and displays
// module pattern
const screenController = (() => {
    // 13
    const playerX = player("Player X", "X");
    const playerO = player("Player O", "O");

    const myGameController = gameController();
    const myGameBoard = gameBoard();

    const body = document.querySelector("body");

    const playerXScore = document.querySelector("#player-X-score");
    const playerOScore = document.querySelector("#player-O-score");

    const cellButtons = document.querySelectorAll(".game-board button");

    const statusDisplay = document.querySelector(".status-display p");

    // 14
    const keepPlayingButton = document.querySelector("#keep-playing-button");
    const restartGameButton = document.querySelector("#restart-game-button");
    const menuButton = document.querySelector("#menu-button");

    // 15
    const menuDialog = document.querySelector("#menu-dialog");
    const playWithFriendButton = document.querySelector(
        "#play-with-friend-button"
    );
    const playAgainstOdinButton = document.querySelector(
        "#play-against-odin-button"
    );
    const playerXtextInput = document.querySelector("#player-X-name");
    const playerOtextInput = document.querySelector("#player-O-name");

    // helper methods //
    const hideGameOverButtons = () => {
        keepPlayingButton.hidden = true;
        restartGameButton.hidden = true;
        menuButton.hidden = true;
    };

    const showGameOverButtons = () => {
        keepPlayingButton.hidden = false;
        restartGameButton.hidden = false;
        menuButton.hidden = false;
    };

    const updateBoardDisplay = () => {
        const cells = myGameBoard.getCells();
        cellButtons.forEach((cellButton, index) => {
            cellButton.textContent = cells[index];
        });
    };

    // 13
    const updateScoresDisplay = () => {
        playerXScore.textContent = `${playerX.getName()}: ${playerX.getWinsCount()} point${
            playerX.getWinsCount() === 1 ? "" : "s"
        }`;
        playerOScore.textContent = `${playerO.getName()}: ${playerO.getWinsCount()} point${
            playerO.getWinsCount() === 1 ? "" : "s"
        }`;
    };

    const updateStatusDisplay = () => {
        const currentTurn = myGameController.getCurrentTurn();
        if (currentTurn === "X") {
            statusDisplay.textContent = `${playerX.getName()} plays`;
        } else {
            statusDisplay.textContent = `${playerO.getName()} plays`;
        }
    };

    // Initial setup //
    menuDialog.showModal();
    updateScoresDisplay();
    updateStatusDisplay();
    hideGameOverButtons();

    // Event handlers //
    const handleCellButtonClick = (e) => {
        const position = e.target.attributes.id.nodeValue.split("-")[1];
        const currentTurn = myGameController.getCurrentTurn();

        // odin mode
        if (
            playerX.getName() === "Odin" &&
            playerO.getName() === "You" &&
            currentTurn === "X"
        ) {
            position = myGameController.odinPlays();
        }

        // mark cell
        myGameBoard.setCellValue(position, currentTurn);

        // if someone won
        if (myGameController.checkForWin(myGameBoard)) {
            if (currentTurn === "X") {
                playerX.increaseWinsCountByOne();
                statusDisplay.textContent = `${playerX.getName()} won!`;
            } else {
                playerO.increaseWinsCountByOne();
                statusDisplay.textContent = `${playerO.getName()} won!`;
            }

            // 11
            cellButtons.forEach((cellButton) => (cellButton.disabled = true));

            // 13
            updateScoresDisplay();
            updateBoardDisplay();
            showGameOverButtons();
            myGameController.switchTurn();
            return;
        }

        updateBoardDisplay();
        myGameController.switchTurn();
        updateStatusDisplay();

        // 12
        // if there's a tie
        if (myGameBoard.getAvailableCells().length === 0) {
            statusDisplay.textContent = "It's a tie!";
            showGameOverButtons();
        }

        // 10
        cellButtons[position].disabled = true;
    };

    // 14
    const handleKeepPlayingButtonClick = () => {
        myGameBoard.resetBoard();

        cellButtons.forEach((cellButton) => (cellButton.disabled = false));

        hideGameOverButtons();

        updateBoardDisplay();
        updateStatusDisplay();
    };

    const handleRestartButtonClick = () => {
        myGameBoard.resetBoard();

        cellButtons.forEach((cellButton) => (cellButton.disabled = false));

        playerX.resetWinsCount();
        playerO.resetWinsCount();

        myGameController.reset();

        hideGameOverButtons();

        updateScoresDisplay();
        updateBoardDisplay();
        updateStatusDisplay();
    };

    // 15
    const handleMenuButtonClick = () => {
        menuDialog.showModal();
    };

    const handlePlayWithFriendButtonClick = () => {
        playerX.setName(playerXtextInput.value);
        playerO.setName(playerOtextInput.value);
        menuDialog.close();
        handleRestartButtonClick();
        body.setAttribute("class", "friend-mode");
    };

    const handlePlayAgainstOdinButton = () => {
        playerX.setName("Odin");
        playerO.setName("You");
        menuDialog.close();
        handleRestartButtonClick();
        body.setAttribute("class", "odin-mode");
    };

    cellButtons.forEach((cellButton) => {
        cellButton.addEventListener("click", handleCellButtonClick);
    });

    keepPlayingButton.addEventListener("click", handleKeepPlayingButtonClick);

    restartGameButton.addEventListener("click", handleRestartButtonClick);

    menuButton.addEventListener("click", handleMenuButtonClick);

    playWithFriendButton.addEventListener(
        "click",
        handlePlayWithFriendButtonClick
    );

    playAgainstOdinButton.addEventListener(
        "click",
        handlePlayAgainstOdinButton
    );
})();

// testing
