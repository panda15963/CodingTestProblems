class Solution {
    // Instance variables to store board reference and dimensions
    private char[][] board;
    private int rows;
    private int cols;
  
    /**
     * Updates the board based on the click position following Minesweeper rules
     * @param board - 2D character array representing the game board
     * @param click - array containing row and column indices of the click position
     * @return updated board after processing the click
     */
    public char[][] updateBoard(char[][] board, int[] click) {
        // Initialize board dimensions
        this.rows = board.length;
        this.cols = board[0].length;
        this.board = board;
      
        // Extract click coordinates
        int clickRow = click[0];
        int clickCol = click[1];
      
        // If clicked on a mine, reveal it as 'X'
        if (board[clickRow][clickCol] == 'M') {
            board[clickRow][clickCol] = 'X';
        } else {
            // Otherwise, perform DFS to reveal empty squares
            revealEmptySquares(clickRow, clickCol);
        }
      
        return board;
    }
  
    /**
     * Performs depth-first search to reveal empty squares and count adjacent mines
     * @param row - current row index
     * @param col - current column index
     */
    private void revealEmptySquares(int row, int col) {
        // Count adjacent mines
        int adjacentMineCount = 0;
      
        // Check all 8 adjacent cells
        for (int neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
            for (int neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
                // Check if neighbor is within bounds and is a mine
                if (neighborRow >= 0 && neighborRow < rows && 
                    neighborCol >= 0 && neighborCol < cols && 
                    board[neighborRow][neighborCol] == 'M') {
                    adjacentMineCount++;
                }
            }
        }
      
        // If there are adjacent mines, display the count
        if (adjacentMineCount > 0) {
            board[row][col] = (char) (adjacentMineCount + '0');
        } else {
            // No adjacent mines - mark as blank and recursively reveal neighbors
            board[row][col] = 'B';
          
            // Recursively reveal all adjacent empty cells
            for (int neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
                for (int neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
                    // Only process unrevealed empty cells within bounds
                    if (neighborRow >= 0 && neighborRow < rows && 
                        neighborCol >= 0 && neighborCol < cols && 
                        board[neighborRow][neighborCol] == 'E') {
                        revealEmptySquares(neighborRow, neighborCol);
                    }
                }
            }
        }
    }
}
