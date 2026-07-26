/**
 * Calculates the number of unique paths from top-left to bottom-right in a grid with obstacles
 * @param obstacleGrid - 2D array where 0 represents empty cell and 1 represents obstacle
 * @returns Number of unique paths from (0,0) to (m-1,n-1)
 */
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const rows: number = obstacleGrid.length;
    const cols: number = obstacleGrid[0].length;
  
    // Memoization table to store computed results
    // -1 indicates unvisited state
    const memo: number[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(-1)
    );
  
    /**
     * Depth-first search with memoization to count paths
     * @param row - Current row position
     * @param col - Current column position
     * @returns Number of valid paths from current position to destination
     */
    const dfs = (row: number, col: number): number => {
        // Check boundaries and obstacles
        if (row >= rows || col >= cols || obstacleGrid[row][col] === 1) {
            return 0;
        }
      
        // Reached destination (bottom-right corner)
        if (row === rows - 1 && col === cols - 1) {
            return 1;
        }
      
        // Use memoized result if already computed
        if (memo[row][col] === -1) {
            // Calculate paths: move down + move right
            memo[row][col] = dfs(row + 1, col) + dfs(row, col + 1);
        }
      
        return memo[row][col];
    };
  
    // Start DFS from top-left corner (0, 0)
    return dfs(0, 0);
}
