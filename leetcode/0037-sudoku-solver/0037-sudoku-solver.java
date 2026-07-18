class Solution {
    // Flag to indicate if solution is found
    private boolean solutionFound;
  
    // Reference to the sudoku board
    private char[][] board;
  
    // List to store positions of empty cells (stored as single index: row * 9 + col)
    private List<Integer> emptyCells = new ArrayList<>();
  
    // Track which numbers (0-8) are used in each row
    private boolean[][] rowUsed = new boolean[9][9];
  
    // Track which numbers (0-8) are used in each column
    private boolean[][] colUsed = new boolean[9][9];
  
    // Track which numbers (0-8) are used in each 3x3 block
    private boolean[][][] blockUsed = new boolean[3][3][9];

    public void solveSudoku(char[][] board) {
        this.board = board;
      
        // Initialize tracking arrays and collect empty cell positions
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    // Store empty cell position
                    emptyCells.add(row * 9 + col);
                } else {
                    // Mark existing number as used in row, column, and block
                    int digit = board[row][col] - '1';  // Convert '1'-'9' to 0-8
                    rowUsed[row][digit] = true;
                    colUsed[col][digit] = true;
                    blockUsed[row / 3][col / 3][digit] = true;
                }
            }
        }
      
        // Start backtracking from first empty cell
        backtrack(0);
    }

    private void backtrack(int emptyCellIndex) {
        // Base case: all empty cells have been filled successfully
        if (emptyCellIndex == emptyCells.size()) {
            solutionFound = true;
            return;
        }
      
        // Get row and column of current empty cell
        int position = emptyCells.get(emptyCellIndex);
        int row = position / 9;
        int col = position % 9;
      
        // Try placing digits 1-9 (represented as 0-8 internally)
        for (int digit = 0; digit < 9; digit++) {
            // Check if digit can be placed at current position
            if (!rowUsed[row][digit] && 
                !colUsed[col][digit] && 
                !blockUsed[row / 3][col / 3][digit]) {
              
                // Place the digit
                rowUsed[row][digit] = true;
                colUsed[col][digit] = true;
                blockUsed[row / 3][col / 3][digit] = true;
                board[row][col] = (char) (digit + '1');  // Convert 0-8 to '1'-'9'
              
                // Recursively fill next empty cell
                backtrack(emptyCellIndex + 1);
              
                // Backtrack: remove the digit if solution not found
                rowUsed[row][digit] = false;
                colUsed[col][digit] = false;
                blockUsed[row / 3][col / 3][digit] = false;
            }
          
            // Early termination if solution is found
            if (solutionFound) {
                return;
            }
        }
    }
}
