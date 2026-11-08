class Solution {
    // Grid dimensions
    private int rows, cols;
    // Memoization table: dp[row][col][movesRemaining] = number of paths
    private Integer[][][] dp;
    // Modulo constant for large numbers
    private final int MOD = (int) 1e9 + 7;

    /**
     * Finds the number of paths to move the ball out of grid boundary.
     * @param m - number of rows in the grid
     * @param n - number of columns in the grid
     * @param maxMove - maximum number of moves allowed
     * @param startRow - starting row position
     * @param startColumn - starting column position
     * @return number of paths to move out of boundary within maxMove moves
     */
    public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        this.rows = m;
        this.cols = n;
        // Initialize memoization table
        this.dp = new Integer[m][n][maxMove + 1];
      
        // Start DFS from the starting position with maxMove moves
        return dfs(startRow, startColumn, maxMove);
    }

    /**
     * DFS helper function to count paths from current position.
     * @param currentRow - current row position
     * @param currentCol - current column position
     * @param movesRemaining - number of moves remaining
     * @return number of valid paths from current position
     */
    private int dfs(int currentRow, int currentCol, int movesRemaining) {
        // Base case: if out of bounds, we found a valid path
        if (currentRow < 0 || currentRow >= rows || currentCol < 0 || currentCol >= cols) {
            // Return 1 if we still have moves (or exactly 0 moves), 0 otherwise
            return movesRemaining >= 0 ? 1 : 0;
        }
      
        // Base case: no moves left and still in bounds
        if (movesRemaining <= 0) {
            return 0;
        }
      
        // Check memoization table
        if (dp[currentRow][currentCol][movesRemaining] != null) {
            return dp[currentRow][currentCol][movesRemaining];
        }
      
        // Calculate paths from current position
        int pathCount = 0;
      
        // Direction vectors for up, right, down, left
        final int[] directions = {-1, 0, 1, 0, -1};
      
        // Try all four directions
        for (int dir = 0; dir < 4; dir++) {
            int nextRow = currentRow + directions[dir];
            int nextCol = currentCol + directions[dir + 1];
          
            // Add paths from next position and apply modulo
            pathCount = (pathCount + dfs(nextRow, nextCol, movesRemaining - 1)) % MOD;
        }
      
        // Store result in memoization table and return
        dp[currentRow][currentCol][movesRemaining] = pathCount;
        return pathCount;
    }
}
