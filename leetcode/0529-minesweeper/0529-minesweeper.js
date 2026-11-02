/**
 * Updates the game board based on a click position (Minesweeper game logic).
 *
 * @param {character[][]} board - 2D array representing the game board
 * @param {number[]} click - Row and column indices of the click position
 * @return {character[][]} Updated game board
 */
var updateBoard = function(board, click) {
    const rowCount = board.length;
    const colCount = board[0].length;
    const [clickRow, clickCol] = click;

    /**
     * Depth-first search to reveal cells recursively.
     *
     * @param {number} row - Current row index
     * @param {number} col - Current column index
     */
    const revealCell = (row, col) => {
        let adjacentMineCount = 0;

        // Count adjacent mines
        for (let neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
            for (let neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
                if (
                    neighborRow >= 0 && neighborRow < rowCount &&
                    neighborCol >= 0 && neighborCol < colCount &&
                    board[neighborRow][neighborCol] === 'M'
                ) {
                    adjacentMineCount++;
                }
            }
        }

        // Display adjacent mine count
        if (adjacentMineCount > 0) {
            board[row][col] = adjacentMineCount.toString();
            return;
        }

        // Mark as blank
        board[row][col] = 'B';

        // Reveal adjacent empty cells
        for (let neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
            for (let neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
                if (
                    neighborRow >= 0 && neighborRow < rowCount &&
                    neighborCol >= 0 && neighborCol < colCount &&
                    board[neighborRow][neighborCol] === 'E'
                ) {
                    revealCell(neighborRow, neighborCol);
                }
            }
        }
    };

    // Handle clicked cell
    if (board[clickRow][clickCol] === 'M') {
        board[clickRow][clickCol] = 'X';
    } else {
        revealCell(clickRow, clickCol);
    }

    return board;
};