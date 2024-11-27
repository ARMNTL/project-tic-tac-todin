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
            alert("This should not be happening! Cell is taken!");
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
    let odinIsDrunk = true;
    let odinMovesHistory = [];

    let rotatedBoard;
    let unRotatedBoard;

    const setRotatedBoard = (rotationNumber) => {
        // not rotated
        if (rotationNumber === 0) {
            rotatedBoard = {
                0: 0,
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
            };

            unRotatedBoard = {
                0: 0,
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
            };
            // rotated 90 degrees
        } else if (rotationNumber === 1) {
            rotatedBoard = {
                2: 0,
                5: 1,
                8: 2,
                1: 3,
                4: 4,
                7: 5,
                0: 6,
                3: 7,
                6: 8,
            };

            unRotatedBoard = {
                0: 2,
                1: 5,
                2: 8,
                3: 1,
                4: 4,
                5: 7,
                6: 0,
                7: 3,
                8: 6,
            };
            // rotated 180 degrees
        } else if (rotationNumber === 2) {
            rotatedBoard = {
                8: 0,
                7: 1,
                6: 2,
                5: 3,
                4: 4,
                3: 5,
                2: 6,
                1: 7,
                0: 8,
            };

            unRotatedBoard = {
                0: 8,
                1: 7,
                2: 6,
                3: 5,
                4: 4,
                5: 3,
                6: 2,
                7: 1,
                8: 0,
            };
            // rotated 270 degrees
        } else if (rotationNumber === 3) {
            rotatedBoard = {
                6: 0,
                3: 1,
                0: 2,
                7: 3,
                4: 4,
                1: 5,
                8: 6,
                5: 7,
                2: 8,
            };

            unRotatedBoard = {
                0: 6,
                1: 3,
                2: 0,
                3: 7,
                4: 4,
                5: 1,
                6: 8,
                7: 5,
                8: 2,
            };
        }
    };

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

    const odinPlays = (availableCells) => {
        if (odinIsDrunk) {
            const randomCell = Math.floor(
                Math.random() * availableCells.length
            );
            return availableCells[randomCell];
        }

        // rotate board logic
        const rotatedAvailableCells = availableCells.map((eachCell) => {
            return rotatedBoard[eachCell];
        });

        // helper functions
        const cellIsAvailable = (cellNumber) =>
            rotatedAvailableCells.includes(cellNumber);

        const isYouPlayedAnyEdge = () => {
            return (
                !cellIsAvailable(1) ||
                !cellIsAvailable(3) ||
                !cellIsAvailable(5) ||
                !cellIsAvailable(7)
            );
        };

        const checkIfOdinPlayedEdge = () => {
            if (
                odinMovesHistory.includes(1) ||
                odinMovesHistory.includes(3) ||
                odinMovesHistory.includes(5) ||
                odinMovesHistory.includes(7)
            ) {
                return true;
            } else {
                return false;
            }
        };

        const checkIfOdinCanWin = () => {
            let winningPosition = -1;
            winningConditions.forEach((winningCondition) => {
                let winningPositionCandidate = null;
                let numberOfOdinPlayedCells = 0;

                for (let i = 0; i < winningCondition.length; i++) {
                    if (odinMovesHistory.includes(winningCondition[i])) {
                        numberOfOdinPlayedCells++;
                    } else if (availableCells.includes(winningCondition[i])) {
                        winningPositionCandidate = winningCondition[i];
                    }
                }

                if (
                    numberOfOdinPlayedCells === 2 &&
                    winningPositionCandidate !== null
                ) {
                    winningPosition = winningPositionCandidate;
                }
            });

            addOdinMoveHistory(winningPosition);
            return winningPosition;
        };

        const checkIfYouCanWin = () => {
            // this function is very similar to checkIfOdinCanWin(), maybe it can be combined
            let winningPosition = -1;
            const allCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            const playedCells = allCells.filter(
                (cell) => !availableCells.includes(cell)
            );

            const yourMoves = playedCells.filter(
                (cell) => !odinMovesHistory.includes(cell)
            );

            winningConditions.forEach((winningCondition) => {
                let winningPositionCandidate = null;
                let numberOfYouPlayedCells = 0;

                for (let i = 0; i < winningCondition.length; i++) {
                    if (yourMoves.includes(winningCondition[i])) {
                        numberOfYouPlayedCells++;
                    } else if (availableCells.includes(winningCondition[i])) {
                        winningPositionCandidate = winningCondition[i];
                    }
                }

                if (
                    numberOfYouPlayedCells === 2 &&
                    winningPositionCandidate !== null
                ) {
                    winningPosition = winningPositionCandidate;
                }
            });

            addOdinMoveHistory(winningPosition);
            return winningPosition;
        };

        // odin didn't start - first turn
        if (availableCells.length === 8) {
            // odin plays center if available
            if (cellIsAvailable(4)) {
                // rotate board accordingly
                if (
                    !availableCells.includes(0) ||
                    !availableCells.includes(1)
                ) {
                    setRotatedBoard(0);
                } else if (
                    !availableCells.includes(2) ||
                    !availableCells.includes(5)
                ) {
                    setRotatedBoard(1);
                } else if (
                    !availableCells.includes(8) ||
                    !availableCells.includes(7)
                ) {
                    setRotatedBoard(2);
                } else if (
                    !availableCells.includes(6) ||
                    !availableCells.includes(3)
                ) {
                    setRotatedBoard(3);
                }

                addOdinMoveHistory(4);
                return 4;
            } else {
                // you played center, odin plays a corner
                const corners = [0, 2, 6, 8];
                const randomCornerIndex = Math.floor(
                    Math.random() * corners.length
                );
                const randomCorner = corners[randomCornerIndex];

                if (randomCorner === 0) {
                    setRotatedBoard(0);
                } else if (randomCorner === 2) {
                    setRotatedBoard(1);
                } else if (randomCorner === 8) {
                    setRotatedBoard(2);
                } else if (randomCorner === 6) {
                    setRotatedBoard(3);
                }

                addOdinMoveHistory(randomCorner);
                return randomCorner;
            }
        }

        // odin started - second turn
        if (availableCells.length === 7) {
            // if center is available, odin played corner in the first turn
            if (cellIsAvailable(4)) {
                addOdinMoveHistory(4);
                return 4;
            } else if (odinMovesHistory[0] === 4) {
                // if odin played center first
                if (cellIsAvailable(0) && cellIsAvailable(8)) {
                    addOdinMoveHistory(0);
                    return 0;
                } else {
                    setRotatedBoard(1);
                    addOdinMoveHistory(2);
                    return 2;
                }
            } else {
                // odin plays the opposite corner of whatever corner if already played
                addOdinMoveHistory(unRotatedBoard[8]);
                return unRotatedBoard[8];
            }
        }

        // odin didn't start - second turn
        if (availableCells.length === 6) {
            // if you played center first
            if (!odinMovesHistory.includes(4)) {
                if (!cellIsAvailable(1)) {
                    addOdinMoveHistory(unRotatedBoard[7]);
                    return unRotatedBoard[7];
                } else if (!cellIsAvailable(2)) {
                    addOdinMoveHistory(unRotatedBoard[6]);
                    return unRotatedBoard[6];
                } else if (!cellIsAvailable(3)) {
                    addOdinMoveHistory(unRotatedBoard[5]);
                    return unRotatedBoard[5];
                } else if (!cellIsAvailable(5)) {
                    addOdinMoveHistory(unRotatedBoard[3]);
                    return unRotatedBoard[3];
                } else if (!cellIsAvailable(6)) {
                    addOdinMoveHistory(unRotatedBoard[2]);
                    return unRotatedBoard[2];
                } else if (!cellIsAvailable(7)) {
                    addOdinMoveHistory(unRotatedBoard[1]);
                    return unRotatedBoard[1];
                } else if (!cellIsAvailable(8)) {
                    // the only that odin doesn't block
                    addOdinMoveHistory(unRotatedBoard[2]);
                    return unRotatedBoard[2];
                }
            } else {
                // odin played center, you played top left or ledge
                // if you played top left AND ledge
                if (!cellIsAvailable(0) && !cellIsAvailable(1)) {
                    // odin blocks
                    addOdinMoveHistory(unRotatedBoard[2]);
                    return unRotatedBoard[2];
                    // if you played top left and left ledge
                } else if (!cellIsAvailable(0) && !cellIsAvailable(3)) {
                    // odin blocks
                    addOdinMoveHistory(unRotatedBoard[6]);
                    return unRotatedBoard[6];
                    // if you played top ledge and top right
                } else if (!cellIsAvailable(1) && !cellIsAvailable(2)) {
                    // odin blocks
                    addOdinMoveHistory(unRotatedBoard[0]);
                    return unRotatedBoard[0];
                    // if you played top left and bottom left
                } else if (!cellIsAvailable(0) && !cellIsAvailable(6)) {
                    // odin blocks
                    addOdinMoveHistory(unRotatedBoard[3]);
                    return unRotatedBoard[3];
                    // if you played top left and top right
                } else if (!cellIsAvailable(0) && !cellIsAvailable(2)) {
                    // odin blocks
                    addOdinMoveHistory(unRotatedBoard[1]);
                    return unRotatedBoard[1];
                    // if you played top left and bottom edge
                } else if (!cellIsAvailable(0) && !cellIsAvailable(7)) {
                    // odin blocks the trap
                    addOdinMoveHistory(unRotatedBoard[6]);
                    return unRotatedBoard[6];
                    // if played top left right edge
                } else if (!cellIsAvailable(0) && !cellIsAvailable(5)) {
                    // odin blocks the trap
                    addOdinMoveHistory(unRotatedBoard[6]);
                    return unRotatedBoard[6];
                } else if (!cellIsAvailable(0) && !cellIsAvailable(8)) {
                    // odin blocks the trap
                    addOdinMoveHistory(unRotatedBoard[1]);
                    return unRotatedBoard[1];
                } else if (!cellIsAvailable(1) && !cellIsAvailable(6)) {
                    // odin attacks
                    addOdinMoveHistory(unRotatedBoard[0]);
                    return unRotatedBoard[0];
                } else if (!cellIsAvailable(1) && !cellIsAvailable(3)) {
                    // odin attacks
                    addOdinMoveHistory(unRotatedBoard[0]);
                    return unRotatedBoard[0];
                } else if (!cellIsAvailable(1) && !cellIsAvailable(7)) {
                    // odin attacks
                    addOdinMoveHistory(unRotatedBoard[0]);
                    return unRotatedBoard[0];
                } else if (!cellIsAvailable(1) && !cellIsAvailable(5)) {
                    // odin attacks
                    addOdinMoveHistory(unRotatedBoard[2]);
                    return unRotatedBoard[2];
                } else if (!cellIsAvailable(1) && !cellIsAvailable(8)) {
                    // odin attacks
                    addOdinMoveHistory(unRotatedBoard[2]);
                    return unRotatedBoard[2];
                }
            }
        }

        // odin started - third turn
        if (availableCells.length === 5) {
            // if you played any of the edges
            if (
                isYouPlayedAnyEdge() &&
                (odinMovesHistory[0] === 4 || odinMovesHistory[1] === 4)
            ) {
                // this means odin played top left corner, first check if win is possible
                if (cellIsAvailable(8) && !cellIsAvailable(0)) {
                    // odin wins
                    addOdinMoveHistory(unRotatedBoard[8]);
                    return unRotatedBoard[8];
                } else {
                    // if you played top or bottom edge, odin plays bottom left for the win
                    if (!cellIsAvailable(1) || !cellIsAvailable(7)) {
                        addOdinMoveHistory(unRotatedBoard[6]);
                        return unRotatedBoard[6];
                    } else {
                        // any other (side) edge, odin plays top right for the win
                        addOdinMoveHistory(unRotatedBoard[2]);
                        return unRotatedBoard[2];
                    }
                }
            } else {
                // you played a corner
                // if odin played center
                if (odinMovesHistory.includes(4)) {
                    // odin played top left corner in second move
                    if (cellIsAvailable(8)) {
                        // odin wins
                        return unRotatedBoard[8];
                    } else if (cellIsAvailable(6) && !cellIsAvailable(2)) {
                        // odin blocks
                        addOdinMoveHistory(unRotatedBoard[5]);
                        return unRotatedBoard[5];
                    } else if (cellIsAvailable(2) && !cellIsAvailable(6)) {
                        // odin blocks
                        addOdinMoveHistory(unRotatedBoard[7]);
                        return unRotatedBoard[7];
                    }
                } else {
                    // odin played a corner in the first turn and the opposite corner in the second move
                    // if you played any corner, odin plays opposite corner for the win
                    if (!isYouPlayedAnyEdge()) {
                        if (cellIsAvailable(2)) {
                            addOdinMoveHistory(unRotatedBoard[2]);
                            return unRotatedBoard[2];
                        } else {
                            addOdinMoveHistory(unRotatedBoard[6]);
                            return unRotatedBoard[6];
                        }
                    } else {
                        // you played any of the edges
                        if (!cellIsAvailable(1)) {
                            addOdinMoveHistory(unRotatedBoard[7]);
                            return unRotatedBoard[7];
                        } else if (!cellIsAvailable(3)) {
                            addOdinMoveHistory(unRotatedBoard[5]);
                            return unRotatedBoard[5];
                        } else if (!cellIsAvailable(5)) {
                            addOdinMoveHistory(unRotatedBoard[3]);
                            return unRotatedBoard[3];
                        } else if (!cellIsAvailable(7)) {
                            addOdinMoveHistory(unRotatedBoard[1]);
                            return unRotatedBoard[1];
                        }
                    }
                }
            }
        }

        // odin didn't start - third turn
        if (availableCells.length === 4) {
            const odinWinningPosition = checkIfOdinCanWin();
            const yourWinningPosition = checkIfYouCanWin();

            if (odinWinningPosition !== -1) {
                return odinWinningPosition;
            }

            if (yourWinningPosition !== -1) {
                return yourWinningPosition;
            }
        }

        // odin started - fourth turn
        if (availableCells.length === 3) {
            // if you started playing edges, odin didn't play any edges and odin will win here
            if (!checkIfOdinPlayedEdge()) {
                if (cellIsAvailable(2)) {
                    return unRotatedBoard[2];
                } else if (cellIsAvailable(6)) {
                    return unRotatedBoard[6];
                } else if (odinMovesHistory.includes(unRotatedBoard[2])) {
                    if (cellIsAvailable(1)) {
                        return unRotatedBoard[1];
                    } else {
                        return unRotatedBoard[5];
                    }
                } else if (odinMovesHistory.includes(unRotatedBoard[6])) {
                    if (cellIsAvailable(3)) {
                        return unRotatedBoard[3];
                    } else {
                        return unRotatedBoard[7];
                    }
                }
            } else {
                // you played a corner and odin blocked your counter
                if (odinMovesHistory.includes(4)) {
                    if (cellIsAvailable(3)) {
                        // odin wins
                        return unRotatedBoard[3];
                    } else {
                        // you blocked odin's counter, odin last attack
                        return unRotatedBoard[7];
                    }
                } else {
                    // if odin didn't play center, and you played edge and odin blocked
                    if (
                        odinMovesHistory.includes(rotatedBoard[7]) ||
                        odinMovesHistory.includes(rotatedBoard[3])
                    ) {
                        if (cellIsAvailable(6)) {
                            // odin wins
                            return unRotatedBoard[6];
                        } else {
                            // it's a tie
                            return unRotatedBoard[2];
                        }
                    } else if (
                        odinMovesHistory.includes(rotatedBoard[1]) ||
                        odinMovesHistory.includes(rotatedBoard[5])
                    ) {
                        if (cellIsAvailable(2)) {
                            // odin wins
                            return unRotatedBoard[2];
                        } else {
                            // it's a tie
                            return unRotatedBoard[6];
                        }
                    }
                }
            }
        }

        if (availableCells.length === 2) {
            const odinWinningPosition = checkIfOdinCanWin();
            const yourWinningPosition = checkIfYouCanWin();

            if (odinWinningPosition !== -1) {
                return odinWinningPosition;
            }

            if (yourWinningPosition !== -1) {
                return yourWinningPosition;
            }

            return availableCells[0];
        }

        // odin started - last turn
        if (availableCells.length === 1) {
            return availableCells[0];
        }
    };

    // 13
    const switchTurn = () => {
        currentTurn = currentTurn === "X" ? "O" : "X";
    };

    const reset = () => {
        currentTurn = "X";
        odinMovesHistory = [];
    };

    const resetOdinMovesHistory = () => {
        odinMovesHistory = [];
    };

    const isOdinDrunk = () => odinIsDrunk;

    const setIsOdinDrunk = (drunk) => (odinIsDrunk = drunk);

    const addOdinMoveHistory = (position) => {
        odinMovesHistory.push(position);
    };

    return {
        switchTurn,
        getCurrentTurn,
        checkForWin,
        reset,
        odinPlays,
        isOdinDrunk,
        setIsOdinDrunk,
        addOdinMoveHistory,
        setRotatedBoard,
        resetOdinMovesHistory,
    };
}

// 6
// screenController handles player interactions, buttons and displays
// module pattern
const screenController = (() => {
    const globalOdinThinkingTime = 2000;
    // 13
    const playerX = player("Player X", "X");
    const playerO = player("Player O", "O");

    const myGameController = gameController();
    const myGameBoard = gameBoard();

    // grabing html elements
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
    const playAgainstOdinDrunkButton = document.querySelector(
        "#play-against-odin-drunk-button"
    );

    const playAgainstOdinInvincibleButton = document.querySelector(
        "#play-against-odin-invincible-button"
    );

    const playerXtextInput = document.querySelector("#player-X-name");
    const playerOtextInput = document.querySelector("#player-O-name");

    // 16
    const odinThinkingDialog = document.querySelector("#odin-thinking");
    const mainTitle = document.querySelector("body > h1");

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
            statusDisplay.textContent = `${playerO.getName()} play${
                playerO.getName() === "You" ? "" : "s"
            }`;
        }
    };

    const playTurn = (position, currentTurn) => {
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
            return "someone won";
        }

        updateBoardDisplay();
        myGameController.switchTurn();
        updateStatusDisplay();

        // 12
        // if there's a tie
        if (myGameBoard.getAvailableCells().length === 0) {
            statusDisplay.textContent = "It's a tie!";
            showGameOverButtons();
            cellButtons[position].disabled = true;
            return "a tie";
        }

        // 10
        cellButtons[position].disabled = true;
    };

    const odinFirstTurn = () => {
        // odin mode
        if (
            playerX.getName() === "Odin" &&
            playerO.getName() === "You" &&
            myGameController.getCurrentTurn() === "X"
        ) {
            odinThinkingDialog.showModal();
            let position;
            setTimeout(() => {
                odinThinkingDialog.close();

                if (myGameController.isOdinDrunk()) {
                    position = myGameController.odinPlays(
                        myGameBoard.getAvailableCells()
                    );
                } else {
                    const bestStartingPositions = [0, 2, 4, 4, 6, 8];
                    const randomChoice = Math.floor(
                        Math.random() * bestStartingPositions.length
                    );
                    position = bestStartingPositions[randomChoice];
                    // fix starting center
                    // position = 0;
                    if (position === 4 || position === 0) {
                        myGameController.setRotatedBoard(0);
                    } else if (position === 2) {
                        myGameController.setRotatedBoard(1);
                    } else if (position === 8) {
                        myGameController.setRotatedBoard(2);
                    } else if (position === 6) {
                        myGameController.setRotatedBoard(3);
                    }

                    myGameController.addOdinMoveHistory(position);
                }

                myGameBoard.setCellValue(position, "X");
                cellButtons[position].disabled = true;
                myGameController.switchTurn();
                updateScoresDisplay();
                updateBoardDisplay();
                updateStatusDisplay();
            }, globalOdinThinkingTime);
        }
    };

    // Initial setup //
    menuDialog.showModal();
    updateScoresDisplay();
    updateStatusDisplay();
    hideGameOverButtons();

    // Event handlers //
    const handleCellButtonClick = (e) => {
        let position = e.target.attributes.id.nodeValue.split("-")[1];
        const currentTurn = myGameController.getCurrentTurn();

        let turnResult = playTurn(position, currentTurn);

        if (turnResult === "someone won" || turnResult === "a tie") return;

        // odin mode
        if (
            playerX.getName() === "Odin" &&
            playerO.getName() === "You" &&
            currentTurn === "O"
            // turnResult !== "a tie"
        ) {
            odinThinkingDialog.showModal();
            setTimeout(() => {
                odinThinkingDialog.close();
                position = myGameController.odinPlays(
                    myGameBoard.getAvailableCells()
                );
                turnResult = playTurn(position, "X");
                if (turnResult === "someone won" || turnResult === "a tie")
                    return;
            }, globalOdinThinkingTime);
        }
    };

    // 14
    const handleKeepPlayingButtonClick = () => {
        myGameBoard.resetBoard();
        myGameController.resetOdinMovesHistory();

        cellButtons.forEach((cellButton) => (cellButton.disabled = false));

        hideGameOverButtons();

        // odin mode
        odinFirstTurn();

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

        // odin mode
        odinFirstTurn();

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
        mainTitle.textContent = "Tic Tac Toe";
    };

    const handlePlayAgainstOdinDrunkButton = () => {
        playerX.setName("Odin");
        playerO.setName("You");
        menuDialog.close();
        body.setAttribute("class", "odin-mode");
        handleRestartButtonClick();

        myGameController.setIsOdinDrunk(true);

        mainTitle.textContent = "Tic Tac Todin (drunk)";
        odinThinkingDialog.textContent = "Odin is drinking... hic!";
    };

    const handlePlayAgainstOdinInvincibleButton = () => {
        playerX.setName("Odin");
        playerO.setName("You");
        menuDialog.close();
        body.setAttribute("class", "odin-mode");
        handleRestartButtonClick();

        myGameController.setIsOdinDrunk(false);

        mainTitle.textContent = "Tic Tac Todin (invincible)";
        odinThinkingDialog.textContent = "Odin is thinking... hmm...";
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

    playAgainstOdinDrunkButton.addEventListener(
        "click",
        handlePlayAgainstOdinDrunkButton
    );

    playAgainstOdinInvincibleButton.addEventListener(
        "click",
        handlePlayAgainstOdinInvincibleButton
    );
})();

// testing
