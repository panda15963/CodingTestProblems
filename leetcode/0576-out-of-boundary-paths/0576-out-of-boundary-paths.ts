/**
 * Finds the number of paths to move the ball out of grid boundary.
 * The ball can move at most maxMove times in 4 directions (up, down, left, right).
 * 
 * @param m - Number of rows in the grid
 * @param n - Number of columns in the grid
 * @param maxMove - Maximum number of moves allowed
 * @param startRow - Starting row position of the ball
 * @param startColumn - Starting column position of the ball
 * @returns Number of paths to move the ball out of boundary, modulo 10^9 + 7
 */
function findPaths(
    m: number,
    n: number,
    maxMove: number,
    startRow: number,
    startColumn: number,
): number {
    // Initialize 3D memoization array: memo[row][col][remainingMoves]
    // -1 indicates unvisited state
    const memo: number[][][] = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => 
            Array(maxMove + 1).fill(-1)
        )
    );
  
    // Modulo value to prevent integer overflow
    const MOD = 1000000007;
  
    // Direction vectors for moving: up, right, down, left
    // Used as pairs: (dirs[i], dirs[i+1]) represents (deltaRow, deltaCol)
    const directions = [-1, 0, 1, 0, -1];
  
    /**
     * Depth-first search with memoization to count valid paths.
     * 
     * @param row - Current row position
     * @param col - Current column position
     * @param movesRemaining - Number of moves remaining
     * @returns Number of valid paths from current position
     */
    const dfs = (row: number, col: number, movesRemaining: number): number => {
        // Base case: if out of bounds, we found a valid path (if we have non-negative moves)
        if (row < 0 || row >= m || col < 0 || col >= n) {
            return movesRemaining >= 0 ? 1 : 0;
        }
      
        // Base case: no moves remaining and still inside grid
        if (movesRemaining <= 0) {
            return 0;
        }
      
        // Return memoized result if already computed
        if (memo[row][col][movesRemaining] !== -1) {
            return memo[row][col][movesRemaining];
        }
      
        // Calculate total paths from current position
        let totalPaths = 0;
      
        // Try all 4 directions
        for (let dirIndex = 0; dirIndex < 4; dirIndex++) {
            const nextRow = row + directions[dirIndex];
            const nextCol = col + directions[dirIndex + 1];
          
            // Add paths from next position with one less move
            totalPaths = (totalPaths + dfs(nextRow, nextCol, movesRemaining - 1)) % MOD;
        }
      
        // Memoize and return the result
        memo[row][col][movesRemaining] = totalPaths;
        return totalPaths;
    };
  
    // Start DFS from the initial position with all moves available
    return dfs(startRow, startColumn, maxMove);
}
