/**
 * Conway's Game of Life - modifies board in-place
 * Rules:
 * 1. Any live cell with 2-3 live neighbors survives
 * 2. Any dead cell with exactly 3 live neighbors becomes alive
 * 3. All other live cells die, and all other dead cells stay dead
 * 
 * @param board - 2D array representing the game board (1 = alive, 0 = dead)
 */
function gameOfLife(board: number[][]): void {
    const rows = board.length;
    const cols = board[0].length;
  
    // First pass: mark cells that will change state
    // Use encoding: 2 = alive -> dead, -1 = dead -> alive
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Count live neighbors (subtract current cell if alive)
            let liveNeighbors = -board[row][col];
          
            // Check all 8 surrounding cells
            for (let neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
                for (let neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
                    // Check if neighbor is within bounds and alive
                    if (neighborRow >= 0 && neighborRow < rows && 
                        neighborCol >= 0 && neighborCol < cols && 
                        board[neighborRow][neighborCol] > 0) {
                        liveNeighbors++;
                    }
                }
            }
          
            // Apply Game of Life rules
            // Rule: Live cell with < 2 or > 3 neighbors dies
            if (board[row][col] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                board[row][col] = 2; // Mark as alive -> dead
            }
          
            // Rule: Dead cell with exactly 3 neighbors becomes alive
            if (board[row][col] === 0 && liveNeighbors === 3) {
                board[row][col] = -1; // Mark as dead -> alive
            }
        }
    }
  
    // Second pass: update board to final state
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Convert temporary states to final states
            if (board[row][col] === 2) {
                board[row][col] = 0; // Alive -> Dead
            }
            if (board[row][col] === -1) {
                board[row][col] = 1; // Dead -> Alive
            }
        }
    }
}
