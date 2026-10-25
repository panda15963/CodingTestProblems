/**
 * Counts the number of closed islands in a grid
 * A closed island is an island of 0s that doesn't touch the grid border
 * @param grid - 2D array where 0 represents land and 1 represents water
 * @returns The number of closed islands
 */
function closedIsland(grid: number[][]): number {
    const rows: number = grid.length;
    const cols: number = grid[0].length;
  
    // Direction vectors for traversing up, right, down, left
    const directions: number[] = [-1, 0, 1, 0, -1];
  
    /**
     * Performs depth-first search to explore an island
     * @param row - Current row position
     * @param col - Current column position
     * @returns 1 if the island is closed (doesn't touch border), 0 otherwise
     */
    const dfs = (row: number, col: number): number => {
        // Check if current cell is not on the border (closed island candidate)
        let isClosed: number = (row > 0 && col > 0 && row < rows - 1 && col < cols - 1) ? 1 : 0;
      
        // Mark current cell as visited by changing it to water (1)
        grid[row][col] = 1;
      
        // Explore all 4 adjacent directions
        for (let k = 0; k < 4; k++) {
            const nextRow: number = row + directions[k];
            const nextCol: number = col + directions[k + 1];
          
            // If adjacent cell is within bounds and is land (0), continue DFS
            if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols && grid[nextRow][nextCol] === 0) {
                // Use bitwise AND to maintain closed status
                // If any part of the island touches border, entire island becomes not closed
                isClosed &= dfs(nextRow, nextCol);
            }
        }
      
        return isClosed;
    };
  
    let closedIslandCount: number = 0;
  
    // Iterate through all cells in the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // If cell is land (0), explore the island starting from this cell
            if (grid[i][j] === 0) {
                closedIslandCount += dfs(i, j);
            }
        }
    }
  
    return closedIslandCount;
}
