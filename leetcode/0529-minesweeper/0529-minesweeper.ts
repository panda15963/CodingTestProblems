/**
 * Updates the game board based on a click position (Minesweeper game logic)
 * @param board - 2D array representing the game board
 * @param click - Array containing the row and column indices of the click position
 * @returns Updated game board after processing the click
 */
function updateBoard(board: string[][], click: number[]): string[][] {
    const rowCount = board.length;
    const colCount = board[0].length;
    const [clickRow, clickCol] = click;

    /**
     * Depth-first search to reveal cells recursively
     * @param row - Current row index
     * @param col - Current column index
     */
    const revealCell = (row: number, col: number): void => {
        // Count adjacent mines
        let adjacentMineCount = 0;
      
        // Check all 8 adjacent cells
        for (let neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
            for (let neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
                // Validate bounds and check if neighbor is a mine
                if (neighborRow >= 0 && neighborRow < rowCount && 
                    neighborCol >= 0 && neighborCol < colCount && 
                    board[neighborRow][neighborCol] === 'M') {
                    adjacentMineCount++;
                }
            }
        }
      
        // If there are adjacent mines, display the count and stop recursion
        if (adjacentMineCount > 0) {
            board[row][col] = adjacentMineCount.toString();
            return;
        }
      
        // Mark current cell as blank (no adjacent mines)
        board[row][col] = 'B';
      
        // Recursively reveal all adjacent empty cells
        for (let neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
            for (let neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
                // Only process valid, unrevealed empty cells
                if (neighborRow >= 0 && neighborRow < rowCount && 
                    neighborCol >= 0 && neighborCol < colCount && 
                    board[neighborRow][neighborCol] === 'E') {
                    revealCell(neighborRow, neighborCol);
                }
            }
        }
    };

    // Handle click on mine vs empty cell
    if (board[clickRow][clickCol] === 'M') {
        // Mine clicked - game over
        board[clickRow][clickCol] = 'X';
    } else {
        // Empty cell clicked - start revealing process
        revealCell(clickRow, clickCol);
    }
  
    return board;
}
