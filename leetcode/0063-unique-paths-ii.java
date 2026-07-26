class Solution {
    // Memoization table to store computed results for subproblems
    private Integer[][] memo;
    // Reference to the input obstacle grid
    private int[][] obstacleGrid;
    // Number of rows in the grid
    private int rows;
    // Number of columns in the grid
    private int cols;

    /**
     * Calculates the number of unique paths from top-left to bottom-right
     * in a grid with obstacles.
     * 
     * @param obstacleGrid 2D array where 1 represents an obstacle and 0 represents an empty cell
     * @return Number of unique paths from (0,0) to (m-1,n-1)
     */
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        // Initialize grid dimensions
        rows = obstacleGrid.length;
        cols = obstacleGrid[0].length;
      
        // Store reference to obstacle grid
        this.obstacleGrid = obstacleGrid;
      
        // Initialize memoization table
        memo = new Integer[rows][cols];
      
        // Start DFS from top-left corner (0, 0)
        return dfs(0, 0);
    }

    /**
     * Recursive helper function using DFS with memoization to count paths.
     * 
     * @param row Current row position
     * @param col Current column position
     * @return Number of unique paths from current position to destination
     */
    private int dfs(int row, int col) {
        // Base case: Out of bounds or obstacle encountered
        if (row >= rows || col >= cols || obstacleGrid[row][col] == 1) {
            return 0;
        }
      
        // Base case: Reached destination (bottom-right corner)
        if (row == rows - 1 && col == cols - 1) {
            return 1;
        }
      
        // Check if result already computed (memoization)
        if (memo[row][col] == null) {
            // Calculate paths by moving down or right
            int pathsDown = dfs(row + 1, col);
            int pathsRight = dfs(row, col + 1);
          
            // Store the sum of paths in memoization table
            memo[row][col] = pathsDown + pathsRight;
        }
      
        // Return memoized result
        return memo[row][col];
    }
}