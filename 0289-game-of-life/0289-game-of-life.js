/**
 * Conway's Game of Life - modifies board in-place
 *
 * Rules:
 * 1. Any live cell with 2-3 live neighbors survives
 * 2. Any dead cell with exactly 3 live neighbors becomes alive
 * 3. All other live cells die, and all other dead cells stay dead
 *
 * @param {number[][]} board - 2D array representing the game board
 */
function gameOfLife(board) {
    const rows = board.length;
    const cols = board[0].length;

    // First pass: mark cells that will change state
    // 2  = alive -> dead
    // -1 = dead -> alive
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            // Count live neighbors
            // Subtract current cell if it is alive
            let liveNeighbors = -board[row][col];

            // Check all 8 surrounding cells
            for (
                let neighborRow = row - 1;
                neighborRow <= row + 1;
                neighborRow++
            ) {
                for (
                    let neighborCol = col - 1;
                    neighborCol <= col + 1;
                    neighborCol++
                ) {
                    // Check bounds and whether the cell is alive
                    if (
                        neighborRow >= 0 &&
                        neighborRow < rows &&
                        neighborCol >= 0 &&
                        neighborCol < cols &&
                        board[neighborRow][neighborCol] > 0
                    ) {
                        liveNeighbors++;
                    }
                }
            }

            // Live cell with fewer than 2 or more than 3
            // live neighbors dies
            if (
                board[row][col] === 1 &&
                (liveNeighbors < 2 || liveNeighbors > 3)
            ) {
                board[row][col] = 2;
            }

            // Dead cell with exactly 3 live neighbors
            // becomes alive
            if (
                board[row][col] === 0 &&
                liveNeighbors === 3
            ) {
                board[row][col] = -1;
            }
        }
    }

    // Second pass: convert temporary states
    // into final states
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === 2) {
                board[row][col] = 0;
            }

            if (board[row][col] === -1) {
                board[row][col] = 1;
            }
        }
    }
}