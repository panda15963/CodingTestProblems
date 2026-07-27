class Solution {
    // Board size
    private int n;
    // Counter for valid solutions
    private int ans;
    // Track which columns are occupied by queens
    private boolean[] cols = new boolean[10];
    // Track which main diagonals (top-left to bottom-right) are occupied
    // For cells on the same main diagonal: row + col is constant
    private boolean[] dg = new boolean[20];
    // Track which anti-diagonals (top-right to bottom-left) are occupied
    // For cells on the same anti-diagonal: row - col is constant
    // Add n to make indices non-negative
    private boolean[] udg = new boolean[20];

    /**
     * Calculate the total number of distinct solutions to the n-queens puzzle
     * @param n The size of the chessboard (n x n)
     * @return The number of distinct solutions
     */
    public int totalNQueens(int n) {
        this.n = n;
        dfs(0);
        return ans;
    }

    /**
     * Depth-first search to place queens row by row
     * @param row Current row index being processed
     */
    private void dfs(int row) {
        // Base case: all queens successfully placed
        if (row == n) {
            ++ans;
            return;
        }
      
        // Try placing a queen in each column of the current row
        for (int col = 0; col < n; ++col) {
            // Calculate diagonal indices
            int mainDiagonal = row + col;
            int antiDiagonal = row - col + n;
          
            // Check if current position conflicts with existing queens
            if (cols[col] || dg[mainDiagonal] || udg[antiDiagonal]) {
                continue;
            }
          
            // Place queen at (row, col)
            cols[col] = true;
            dg[mainDiagonal] = true;
            udg[antiDiagonal] = true;
          
            // Recursively place queens in the next row
            dfs(row + 1);
          
            // Backtrack: remove queen from (row, col)
            cols[col] = false;
            dg[mainDiagonal] = false;
            udg[antiDiagonal] = false;
        }
    }
}