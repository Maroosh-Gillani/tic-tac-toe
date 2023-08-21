// Player Factory
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol }
};

const player1 = Player("Player 1", "X");
const player2 = Player("player 2", "O");

document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener('click', () => {
        gameBoard.resetBoard();
        gameBoard.renderBoard();
        // gameBoard.gameIsOver = false;
    })

    // Gameboard Module
    const gameBoard = (() => {
        let board = ["", "", "", "", "", "", "", "", ""];
        let gameOver = false;

        const getBoard = () => board;

        const updateCell = (index, player) => {
            if (board[index] === "") {
                board[index] = player.getSymbol();
                return true;
            }
            return false;
        };

        const resetBoard = () => {
            board = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = player1;
            gameOver = false;
        };

        const renderBoard = () => {
            const board = getBoard();
            const cells = document.querySelectorAll(".cell");

            cells.forEach((cell, index) => {
                cell.textContent = board[index];
                cell.addEventListener("click", () => {
                    makeMove(index)
                });
            });
        };



        const makeMove = (index) => {
            if (gameOver) return;

            const currentPlayer = getCurrentPlayer();
            if (updateCell(index, currentPlayer)) {
                renderBoard();
                const winner = checkWinner();
                if (winner) {
                    console.log(`${winner} wins!`);
                    gameOver = true;
                } else {
                    switchPlayers();
                }
            }
        };

        const checkWinner = () => {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            for (let combo of winningCombos) {
                const [a, b, c] = combo;
                if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
                    gameOver = true;
                    return board[a];
                }
            }
            return null;
        };

        let currentPlayer = player1;

        const switchPlayers = () => {
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        };

        const getCurrentPlayer = () => {
            return currentPlayer;
        };

        renderBoard();

        return {
            getBoard,
            updateCell,
            resetBoard,
            renderBoard,
            checkWinner,
            switchPlayers,
            getCurrentPlayer,
            makeMove,
        }

    })();
});