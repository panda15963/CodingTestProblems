class Solution {
    public void gameOfLife(int[][] board) {
        int rows = board.length;
        int cols = board[0].length;
      
        // First pass: Mark cells that need to change state
        // Use encoding: 2 = was alive, will die; -1 = was dead, will become alive
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                // Count live neighbors (excluding current cell)
                int liveNeighbors = countLiveNeighbors(board, row, col, rows, cols);
              
                // Apply Conway's Game of Life rules
                // Rule 1 & 3: Live cell with < 2 or > 3 neighbors dies
                if (board[row][col] == 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                    board[row][col] = 2; // Mark as "will die"
                }
                // Rule 4: Dead cell with exactly 3 neighbors becomes alive
                if (board[row][col] == 0 && liveNeighbors == 3) {
                    board[row][col] = -1; // Mark as "will become alive"
                }
                // Rule 2: Live cell with 2-3 neighbors survives (no change needed)
            }
        }
      
        // Second pass: Update all cells to their final states
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (board[row][col] == 2) {
                    board[row][col] = 0; // Cell dies
                } else if (board[row][col] == -1) {
                    board[row][col] = 1; // Cell becomes alive
                }
            }
        }
    }
  
    /**
     * Counts the number of live neighbors for a given cell
     * Live cells are represented by positive values (1 or 2)
     */
    private int countLiveNeighbors(int[][] board, int row, int col, int rows, int cols) {
        int liveCount = 0;
      
        // Check all 8 neighboring cells
        for (int neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
            for (int neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
                // Skip out-of-bounds cells and the current cell itself
                if (neighborRow < 0 || neighborRow >= rows || 
                    neighborCol < 0 || neighborCol >= cols ||
                    (neighborRow == row && neighborCol == col)) {
                    continue;
                }
              
                // Count cell as live if it's currently alive (value > 0)
                // This includes cells marked as 2 (will die) since they're currently alive
                if (board[neighborRow][neighborCol] > 0) {
                    liveCount++;
                }
            }
        }
      
        return liveCount;
    }
}
