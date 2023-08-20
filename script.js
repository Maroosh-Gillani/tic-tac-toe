document.addEventListener('DOMContentLoaded', function () {
    // Gameboard Module
    const gameBoard = (() => {
        let board = ["", "", "", "", "", "", "", "", ""];

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
        };

        const renderBoard = () => {
            const board = getBoard();
            const cells = document.querySelectorAll(".cell");

            cells.forEach((cell, index) => {
                cell.textContent = board[index];
            });
        };

        return {
            getBoard,
            updateCell,
            resetBoard,
            renderBoard,
        }
    })();

    // Player Factory
    const Player = (name, symbol) => {
        const getName = () => name;
        const getSymbol = () => symbol;

        return { getName, getSymbol }
    };

    const player1 = Player("Player 1", "X");
    const player2 = Player("player 2", "O");
});